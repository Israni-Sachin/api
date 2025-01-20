// const express = require('express');
// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
// const fs = require('fs');
// const ffprobe = require('fluent-ffmpeg').ffprobe;

// const app = express();

// // Configure Cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // Configure Multer for file upload
// const upload = multer({
//     dest: 'uploads/', // Temporary storage
//     limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB max
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith('video/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('Invalid file type. Only videos are allowed.'));
//         }
//     },
// }).single('video');

// // Validate video duration (max 7 seconds)
// const validateVideoDuration = (filePath) => {
//     return new Promise((resolve, reject) => {
//         ffprobe(filePath, (err, metadata) => {
//             if (err) {
//                 return reject('Error reading video metadata.');
//             }
//             const duration = metadata.format.duration;
//             if (duration > 7) {
//                 return reject('Video duration exceeds 7 seconds.');
//             }
//             resolve();
//         });
//     });
// };

// // Upload video endpoint
// app.post('/upload', (req, res) => {
//     upload(req, res, async (err) => {
//         if (err) {
//             return res.status(400).send({ error: err.message });
//         }

//         const videoPath = req.file.path;

//         try {
//             // Validate video duration
//             await validateVideoDuration(videoPath);

//             // Upload to Cloudinary
//             cloudinary.uploader.upload_large(
//                 videoPath,
//                 {
//                     resource_type: 'video',
//                 },
//                 (error, result) => {
//                     // Remove the temporary file
//                     fs.unlinkSync(videoPath);

//                     if (error) {
//                         return res.status(500).send({ error: 'Cloudinary upload failed.' });
//                     }

//                     res.send({ message: 'Video uploaded successfully.', data: result });
//                 }
//             );
//         } catch (error) {
//             // Remove the temporary file on validation failure
//             fs.unlinkSync(videoPath);
//             return res.status(400).send({ error: error });
//         }
//     });
// });

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require("express");
const multer = require("multer");
const { cloudinary } = require("./helpers/upload");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const router = express.Router();

// Configure Multer storage with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        resource_type: "video"  // Resource type: video
    },
});

// Multer middleware for handling video uploads
const upload = multer({ storage });

// Video upload endpoint
const routess = async (app) => {
    app.post("/upload-video", upload.single("video"), async (req, res) => {
        try {
            const file = req.file;

            if (!file) {
                return res.status(400).json({ message: "No video file uploaded" });
            }

            res.status(200).json({
                message: "Video uploaded successfully",
                url: file.path, // The URL of the uploaded video
                public_id: file.filename, // Public ID of the uploaded video
            });
        } catch (error) {
            console.error("Error uploading video:", error);
            res.status(500).json({ message: "Error uploading video", error });
        }
    });

    app.delete("/delete-video/:public_id", async (req, res) => {
        try {
            const { public_id } = req.params;

            if (!public_id) {
                return res.status(400).json({ message: "Public ID is required." });
            }

            // Use Cloudinary's `destroy` method to delete the video
            const result = await cloudinary.uploader.destroy(public_id, { resource_type: "video" });
            console.log(result);


            if (result.result === "not found") {
                return res.status(404).json({ message: "Video not found." });
            }

            res.status(200).json({
                message: "Video deleted successfully.",
                result,
            });
        } catch (error) {
            console.error("Error deleting video:", error.message);
            res.status(500).json({ message: "Error deleting video.", error });
        }
    });
}

module.exports = routess;
