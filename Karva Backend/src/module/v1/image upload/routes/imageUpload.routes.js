const imageUploadController = require("../controllers/imageUpload.controller")
const roleValidator = require('../../../../middlewares/role-validator');
const { verifyToken } = require("../../../../middlewares/token");

const express = require('express');

const app = express();

const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));
const upload = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 500000 }
});

const imageUploadRoutes = async (app) => {

    app.post('/image/upload', upload.single("file"), imageUploadController.uploadImage);

}

module.exports = imageUploadRoutes;