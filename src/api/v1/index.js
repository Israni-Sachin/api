const express = require('express');
const _studentRoutes = require('../../modules/v1/student/router/student.router')

module.exports = () => {
    const api = express.Router()
    _studentRoutes.studentRoute(api)
    return api;
}