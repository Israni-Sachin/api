const Exam = require("../../../../models/exam.model");
const Users = require("../../../../models/user.model");

const examGet = async (user) => {

    const user_details = await Users.find({ _id: user.id })

    const exam_details = await Exam.find({ exam_class: user_details[0].user_class })

    return exam_details;
    // console.log(user_details);
    // console.log(user_details[0].user_class);

}

const examGetAll = async (user) => {

    // const user_details = await Users.find({ _id: user.id })

    const exam_details = await Exam.find({})

    return exam_details;
    // console.log(user_details);
    // console.log(user_details[0].user_class);

}

const examAdd = async (data) => {

    return await Exam.create(data);

}

const examUpdate = async (data) => {

    return await Exam.findOneAndUpdate({ _id: data.exam_id }, data)

}

const examDelete = async (data) => {

    // await Exam.deleteMany({ _id: { $in: data.exam_ids } })
    await Exam.deleteOne({ _id: data.exam_id })

}

module.exports = { examGet, examAdd, examUpdate, examDelete };

