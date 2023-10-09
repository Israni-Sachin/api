const _studentController = require('../controllers/student.controller')

const studentRoute = (app) => {
    app.post('/student', _studentController.studentAdd)
    app.get('/student', _studentController.studentAll)
    app.get('/student/:userId', _studentController.studentGet)
    app.patch('/student/:userId', _studentController.studentUpdate)
    app.delete('/student/:userId', _studentController.studentDelete)
}

module.exports = {studentRoute}