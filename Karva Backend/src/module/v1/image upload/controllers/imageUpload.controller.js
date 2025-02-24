const { errorResponse, successResponse } = require("../../../../helpers/http-response");
const image = require('../services/imageUpload.services');

const uploadImage = async (req, res) => {
    try {
        let result = await image.uploadImage(req);
        successResponse({ res, message: 'Image uploaded successfully', data: result });

    } catch (err) {
        errorResponse(res, err);
    }
}

const deleteImage = async (req, res) => {
    try {
        let result = await image.deleteImage(req.body.public_id,req.body.type);
        successResponse({ res, message: result.msg, data: result.cloudi.result });

    } catch (err) {
        errorResponse(res, err);
    }
}

// const uploadImages = async (req, res) => {
//     try {
//         const img_url = await uploadFile(req.file.path)
//         console.log(img_url);
//         // console.log(req.files);
//         successResponse({ res, message: 'Image uploaded successfully',data: img_url });

//     } catch (error) {
//         errorResponse(res, err);
//     }
// }

module.exports = { uploadImage ,deleteImage};
