const { errorResponse, successResponse } = require("../../../../helpers/http-response");
const { uploadFile } = require("../../../../helpers/upload");
const Blogs = require("../../../../models/blogs.model");


const createBlog = async (req, res) => {
    try {

        let check = await Blogs.findOne({ title: req.body.title });
        if (check) return res.status(404).json({ message: 'Title Already exists' });

        await Blogs.create(req.body);

        successResponse({ res, message: 'Blog created successfully' });

    } catch (err) {
        errorResponse(res, err);
    }
};

const getAllBlogs = async (req, res) => {
    try {

        const blogs = await Blogs.find();

        successResponse({ res, message: 'Blogs fetched successfully', data: blogs });

    } catch (err) {
        errorResponse(res, err);
    }
};


const getBlogBySlug = async (req, res) => {
    try {

        const blog = await Blogs.findOne({ slug: req.params.slug });

        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        successResponse({ res, message: 'Blog fetched successfully', data: blog });

    } catch (err) {
        errorResponse(res, err);

    }
};

const updateBlogBySlug = async (req, res) => {
    try {

        let blog = await Blogs.findOne({ slug: req.params.slug });
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        let check = await Blogs.findOne({ _id: { $ne: blog._id }, title: req.body.title });
        if (check) return res.status(404).json({ message: 'Title Already Exists' });

        const slug = req.body.title.toLowerCase().replaceAll(' ', '-');
        const data = req.body
        data.slug = slug;

        const result = await Blogs.updateOne({ slug: req.params.slug }, data);

        successResponse({ res, message: 'Blog updated successfully', data: result });
    } catch (err) {
        errorResponse(res, err);
    }
};


const deleteBlogBySlug = async (req, res) => {
    try {
        const blog = await Blogs.findOneAndDelete({ slug: req.params.slug });

        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        successResponse({ res, message: 'Blog deleted successfully' });
    } catch (err) {
        errorResponse(res, err);
    }
};

module.exports = { createBlog, getAllBlogs, getBlogBySlug, updateBlogBySlug, deleteBlogBySlug };
