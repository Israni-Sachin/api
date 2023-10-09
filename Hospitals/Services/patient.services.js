// let patients = require('../Data/patient.json')
let fs = require('fs');
const db = require('../db/db.con')


async function getPatient() {
    let query = `SELECT * from patient`
    let result = await db.query(query);
    return result[0];
}

async function getPatientById(userId) {
    let query = `SELECT * from patient WHERE pt_id='${userId}'`
    let result = await db.query(query);
    console.log(result);
    return result[0];
}
async function addPatient(body) {
    const fields = ['pt_name', 'pt_age', 'pt_gender'];
    const placeholders = '?,'.repeat(fields.length).replace(/,$/, '');
    const query = `INSERT INTO patient
                (${fields.join()}) VALUES
                (${placeholders})`
    const result = await db.query(query, [body.pt_name, body.pt_age, body.pt_gender])
}

async function updatePatient(userId, data) {
    const user = await getPatientById(userId);
    const query = `UPDATE patient 
                   SET pt_name = ?, pt_age = ?, pt_gender=? 
                   WHERE st_id = ${userId} `
    const result = await db.query(query, [data.pt_name || user[0].pt_name, data.pt_age || user[0].pt_age, data.pt_gender || user[0].pt_gender])
    return result[0];
}

async function deletePatient(userId) {
    const query = `Delete from patient where pt_id=${userId}`
    const result = await db.query(query)
    return result[0];
}


module.exports = { getPatientById, getPatient, addPatient, updatePatient, deletePatient, updateAllPatientDetails }