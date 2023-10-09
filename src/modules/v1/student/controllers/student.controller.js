const studentService = require('../services/student.service')

const studentAdd = async (req, res) => {
    try {
        let data = Object.assign({}, req.body, req.params, req.query);
        await studentService.studentAdd(data);
        res.status(200).json({ message: "Student added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error while adding student' });
    }
}
const studentAll = async (req, res) => {
    try {
        let result = await studentService.studentAll();
        res.status(200).json({ data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error while adding student' });
    }
}
const studentGet = async (req, res) => {
    try {
        let data = req.params.userId
        let result = await studentService.studentGet(data);
        res.status(200).json({ message: "Student fetched successfully", data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error while getting student' });
    }
}

const studentUpdate = async (req, res) => {
    try {
        let userId = req.params.userId
        let data = req.body;
        let result = await studentService.studentUpdate(userId, data);
        res.status(200).json({ message: "Student updated successfully", data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error while updating student' });
    }

}

const studentDelete = async (req, res) => {
    try {
        let data = req.params.userId;
        let result = await studentService.studentDelete(data);
        res.status(200).json({ message: "Student deleted successfully", data_affected: result.affectedRows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while deleting student" });
    }
}

module.exports = { studentAdd, studentAll, studentGet,studentUpdate, studentDelete }