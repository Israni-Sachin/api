const Attendence = require('../../../../models/attendence.model');

const attendenceGet = async (user) => {

    let attendence = await Attendence.findOne({ 'atten_fk_user_id.user_id': user.id })

    if (!response) throw new Error("DATA_NOT_FOUND");

    return attendence;
}


const attendenceAdd = async (body, user) => {

    let bulkData = [];
    let stud_ids = body?.stud_ids || [];
    for (const stud of stud_ids) {

        bulkData.push({ insertOne: { "document": { 'atten_fk_user_id.user_id': stud.id, atten_isPresent: stud.isPresent, atten_date: body.atten_date } } });

    }
    
    return await Attendence.bulkWrite(bulkData);
}

const attendenceUpdate = async (body, user) => {
    let bulkData = [];
    let stud_ids = body?.stud_ids || [];
    for (const stud of stud_ids) {

        bulkData.push({ updateOne: { filter: { 'atten_fk_user_id.user_id': stud.id }, update: { $set: { atten_isPresent: stud.isPresent } } } });

    }
    console.log(bulkData);
    return await Attendence.bulkWrite(bulkData);
}

const attendenceDelete = async (user, data) => {

    // find attendence based on user id and remove attendence items
    return await Attendence.findOneAndUpdate({ attendence_fk_user_id: user.id },
        { $pull: { attendence_items: { attendenceitm_fk_prd_id: { $in: data.attendence_items } } } },
        { new: true })
        .populate('attendence_items.attendenceitm_fk_prd_id', 'prd_name prd_price prd_img');

}
module.exports = { attendenceGet, attendenceAdd, attendenceUpdate, attendenceDelete };



