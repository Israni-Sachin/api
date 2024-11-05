const mongoose = require('mongoose');
const slugify = require('slugify');
const { imageSchema } = require('../common/common-functions');

const BlogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true
    },
    image: {
        type: imageSchema
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

BlogsSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

const Blogs = mongoose.model('Blogs', BlogsSchema);
module.exports = Blogs;
