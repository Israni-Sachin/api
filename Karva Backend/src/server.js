const express = require('express');
const apiRoutes = require('./api/v1');
require('dotenv').config();
require('./db/db.con')
const cors = require('cors');
const swaggerui = require('swagger-ui-express');
const { apiDocs } = require('./swagger');

const app = express();
app.use('/api-docs', swaggerui.serve, swaggerui.setup(apiDocs));

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: '*' }));





const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const Category = require('./models/category.model');

// Set up body-parser to handle JSON
app.use(bodyParser.json());

// Set up image upload storage
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });


// Add a Category (with image)
app.post('/addCategory', upload.single('categoryImage'), async (req, res) => {
    try {
        const { name, description } = req.body;
        const imageUrl = `https://api-2y60.onrender.com/uploads/${req.file.filename}`;

        const newCategory = await Category({ name, description, imageUrl, subcategories: [] });
        await newCategory.save();

        res.status(201).json({ message: 'Category added successfully', category: newCategory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Add a Subcategory to an existing Category (based on category name)
app.post('/addSubcategory', upload.single('subcategoryImage'), async (req, res) => {
    try {
        const { name, description, categoryName } = req.body;
        const imageUrl = `https://api-2y60.onrender.com/uploads/${req.file.filename}`;

        // Find the category by name
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Add new subcategory to the category's subcategories array
        const newSubcategory = { name, description, imageUrl };
        category.subcategories.push(newSubcategory);

        // Save the updated category
        await category.save();

        res.status(201).json({ message: 'Subcategory added successfully', category });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all categories and their subcategories
app.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Serve uploaded images
app.use('/uploads', express.static('uploads'));









app.use('/', apiRoutes());

app.use('*', (req, res) => {
    res.status(404).send('404 Not found');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});