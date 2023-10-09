const express = require('express');
const router = express.Router();
const doctor_controller = require('../Controllers/doctor_controllers')

router
    .route('/')
    .get(doctor_controller.getDoctor)
    .post(doctor_controller.addDoctor)

router
    .route('/:userId')
    .get(doctor_controller.getDoctorById)
    .patch(doctor_controller.updateDoctor)
    .delete(doctor_controller.deleteDoctor)

module.exports = router
