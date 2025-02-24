require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const app = express();

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer storage for direct Cloudinary upload (No Folder)
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        resource_type: "video", // Set resource type to video
    }
});

const upload = multer({ storage: storage });

// API Route to Upload Video
const asisehi = async (app) => {

    app.post('/upload', upload.single('video'), (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        
        res.json({
            message: "Video uploaded successfully",
            url: req.file.path, // Cloudinary URL
            id: req.file.filename // Cloudinary URL
        });
    });
    
}

module.exports = asisehi;