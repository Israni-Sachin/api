const { uploadFile, cloudinary } = require("../../../../helpers/upload");
// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
//     // secure: true,
//     // secure_url: true,
//     // region: 'eu-central-1'
// })

const uploadImage = async (req) => {

    if (req.user == undefined)
        throw new Error("UNAUTHORIZED");

    else if (req.user.role != 'admin')
        throw new Error("UNAUTHORIZED");

    // const result = await uploadFile(req.file.path)
    // console.log(result);
    const files = req.files; // Array of files uploaded
    console.log(files);
    
    if (!files || files.length === 0) {
        return { message: 'No files uploaded!' };
    }

    // Upload all files to Cloudinary
    const uploadResults = await Promise.all(
        files.map((file) => uploadFile(file.path))
    );
    // console.log(req.file);
    return uploadResults;

}

const deleteImage = async (publicId) => {
    try {
        const cloudi = await cloudinary.api.delete_resources(publicId)
        // const chatgpt = await cloudinary.uploader.destroy(publicId);
        console.log('Image deleted successfully:', cloudi);
    } catch (error) {
        console.error('Error deleting image:', error);
    }
};

const getImage = async () => {
    try {
        const result = await cloudinary.api.resources({
            resource_type: 'image', // Only retrieve images
            type: 'upload',         // Only retrieve uploaded images
            max_results: 100        // Set the number of results you want to retrieve, max 500 per call
        });
        console.log('All images:', result.resources);
        return result;
    } catch (error) {
        console.error('Error fetching images:', error);
    }

}

module.exports = { uploadImage, deleteImage };