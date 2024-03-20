const Doubts = require('../../../../models/doubts.model');
const Users = require('../../../../models/user.model');

const doubtsGet = async (user) => {

    let doubts = await Doubts.find({ 'dt_fk_user_id.user_id': user.user_id })

    if (!doubts) throw new Error("DATA_NOT_FOUND");

    return doubts;
}

const doubtsAdd = async (body, user) => {

    await Doubts.create(body);

}

const doubtsUpdate = async (body, user) => {
    // let bulkData = [];
    // let stud_ids = body?.stud_ids || [];
    // for (const stud of stud_ids) {

    //     bulkData.push({ updateOne: { filter: { 'dt_fk_user_id.user_id': stud.id }, update: { $set: { atten_isPresent: stud.isPresent } } } });

    // }
    // console.log(bulkData);
    // return await Doubts.bulkWrite(bulkData);
    let updatedata = await Doubts.findOneAndUpdate({ _id: body._id }, body);

    if (!updatedata) throw new Error("DATA_NOT_FOUND");

    return updatedata;
}

const doubtsGett = async (user) => {

    let doubts = await Doubts.find({})

    if (!doubts) throw new Error("DATA_NOT_FOUND");

    return doubts;
}

const doubtsAddt = async (body, user) => {

    // let bulkData = [];
    // let stud_ids = body?.stud_ids || [];
    // for (const stud of stud_ids) {

    //     bulkData.push({ insertOne: { "document": { 'dt_fk_user_id.user_id': stud.id, atten_isPresent: stud.isPresent, atten_date: body.atten_date } } });

    // }
    let updatedata = await Doubts.findOneAndUpdate({ _id: body._id }, body);

    if (!updatedata) throw new Error("DATA_NOT_FOUND");

    return updatedata;
    // return await Doubts.bulkWrite(bulkData);
}

const doubtsUpdatet = async (body, user) => {
    // let bulkData = [];
    // let stud_ids = body?.stud_ids || [];
    // for (const stud of stud_ids) {

    //     bulkData.push({ updateOne: { filter: { 'dt_fk_user_id.user_id': stud.id }, update: { $set: { atten_isPresent: stud.isPresent } } } });

    // }
    // console.log(bulkData);
    // return await Doubts.bulkWrite(bulkData);

    let updatedata = await Doubts.findOneAndUpdate({ _id: body._id }, body);

    if (!updatedata) throw new Error("DATA_NOT_FOUND");

    return updatedata;

}

module.exports = { doubtsGet, doubtsAdd, doubtsUpdate, doubtsGett, doubtsAddt, doubtsUpdatet };
