const express = require('express');
const router = express.Router();

// ----------- Routes

const doctor_routes = require('./doctor.routes')
const patient_routes = require('./patient.routes')

// ----------- Middle-wares

const tokenForPatient = require('../middlewares/patient.middleware')
const tokenForDoctor = require('../middlewares/doctor.middleware')


router.use('/patients', tokenForPatient, patient_routes)
// router.use('/doctors', tokenForDoctor, doctor_routes)

module.exports = router;