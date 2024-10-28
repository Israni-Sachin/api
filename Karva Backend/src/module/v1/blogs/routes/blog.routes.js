const blogController = require("../controllers/blogs.controller")
const roleValidator = require('../../../../middlewares/role-validator');
const validator = require('../../../../middlewares/validator');
const blogAddSchema = require('../validator/blog-add.validator');
const blogUpdateSchema = require('../validator/blog-update.validator');
const { verifyToken } = require("../../../../middlewares/token");

const blogRoutes = async (app) => {

    app.post('/blogs', verifyToken, roleValidator(['admin']), validator(blogAddSchema), blogController.createBlog);

    app.get('/blogs', blogController.getAllBlogs);

    app.get('/blogs/:slug', blogController.getBlogBySlug);

    app.put('/blogs/:slug', verifyToken, roleValidator(['admin']), validator(blogUpdateSchema), blogController.updateBlogBySlug);

    app.delete('/blogs/:slug', verifyToken, roleValidator(['admin']), blogController.deleteBlogBySlug);

}

module.exports = blogRoutes;