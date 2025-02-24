const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs'); // File system module for temporary files
const express = require('express')
const app = express();
// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const upload = multer({ dest: 'uploads/' });

// API Route to Upload Video
const routess = async (app) => {

    app.post('/upload', upload.single('video'), async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        // console.log(req.file);

        try {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "video"
            });

            // Delete local file after upload
            fs.unlinkSync(req.file.path);

            res.json({
                status: 200,
                message: "Video uploaded successfully",
                data: {
                    url: result.secure_url,  // Cloudinary URL
                    public_id: result.public_id // Cloudinary Public ID
                }
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}

module.exports = routess;