const blogController = require("../controllers/blogs.controller")
const roleValidator = require('../../../../middlewares/role-validator');
const validator = require('../../../../middlewares/validator');
const blogAddSchema = require('../validator/blog-add.validator');
const blogUpdateSchema = require('../validator/blog-update.validator');
const { verifyToken } = require("../../../../middlewares/token");
// const { upload } = require("../../../../server");

const express = require('express');

const app = express();

const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));
const upload = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 500000 }
});

const blogRoutes = async (app) => {

    app.post('/blogs', blogController.createBlog);

    app.post('/image/upload', upload.single("file"), blogController.uploadImage);

    // app.post('/images/upload', upload.array("files"), blogController.uploadImages);

    app.get('/blogs', blogController.getAllBlogs);

    app.get('/blogs/:slug', blogController.getBlogBySlug);

    app.put('/blogs/:slug', verifyToken, roleValidator(['admin']), validator(blogUpdateSchema), blogController.updateBlogBySlug);

    app.delete('/blogs/:slug', verifyToken, roleValidator(['admin']), blogController.deleteBlogBySlug);

}

module.exports = blogRoutes;