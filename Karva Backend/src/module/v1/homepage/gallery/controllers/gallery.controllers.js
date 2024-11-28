const galleryServices = require('../services/gallery.services');
const { successResponse, errorResponse } = require('../../../../../helpers/http-response');

const galleryGet = async (req, res) => {
    try {
        let result = await galleryServices.galleryGet();
        successResponse({ res, message: 'Gallery fetched successfully', data: result });
    } catch (err) {
        errorResponse(res, err);
    }
}

const galleryAdd = async (req, res) => {
    try {
        await galleryServices.galleryAdd(req.body);
        successResponse({ res, message: "Gallery updated successfully" });
    } catch (err) {
        errorResponse(res, err);
    }
}

module.exports = { galleryGet, galleryAdd };