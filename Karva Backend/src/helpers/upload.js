const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
    // secure: true,
    // secure_url: true,
    // region: 'eu-central-1'
})

const uploadFile = async (filepath) => {
    try {
        const result = await cloudinary.uploader.upload(filepath);
        res = {
            secure_url: result.secure_url,
            public_id: result.public_id
        }
        return res;
    } catch (error) {
        console.error(error.message);
        throw error.message;
    }
}

module.exports = {
    uploadFile, cloudinary
};