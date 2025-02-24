const express = require('express');
const path = require('path')
const apiRoutes = require('./api/v1');
require('dotenv').config();
require('./db/db.con')
const cors = require('cors');

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({ origin: '*' }));


// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
// const fs = require('fs'); // File system module for temporary files

// // Cloudinary Config
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });
// const upload = multer({ dest: 'uploads/' });

// // API Route to Upload Video
// app.post('/upload', upload.single('video'), async (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: "No file uploaded" });
//     }
//     console.log(req.file);
    
//     try {
//         // Upload to Cloudinary
//         const result = await cloudinary.uploader.upload(req.file.path, {
//             resource_type: "video"
//         });

//         // Delete local file after upload
//         fs.unlinkSync(req.file.path);

//         res.json({
//             message: "Video uploaded successfully",
//             url: result.secure_url,  // Cloudinary URL
//             public_id: result.public_id // Cloudinary Public ID
//         });

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

app.use('/', apiRoutes());

app.use('/files', express.static(path.join(__dirname, 'src/module/v1/orders/services')));

app.use('*', (req, res) => {
    res.status(404).send('Route Not found');
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});