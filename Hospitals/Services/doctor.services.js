// let doctors = require('../Data/doctor.json')
let fs = require('fs');

async function getDoctor() {
    return { status: 200, message: 'OK', data: doctors }
}

async function getDoctorById(userId) {
    return { status: 200, message: 'OK', data: doctors.find(v => v.id == userId) };
}

async function addDoctor(body) {
    obj = { id: doctors[doctors.length - 1].id + 1, ...body }
    obj.id = doctors[doctors.length - 1].id + 1
    doctors.push(obj);
    fs.writeFile('./data/patient.json', JSON.stringify(doctors), (err) => console.log(err))
    return { status: 200, message: 'OK', data: obj };
}

async function updateDoctor(userId, body) {
    let getIDindex = doctors.indexOf(doctors.find(val => val.id == userId))
    obj = { ...doctors[getIDindex], ...body, id: userId }
    doctors[getIDindex] = obj
    fs.writeFile('./data/patient.json', JSON.stringify(doctors), (err) => console.log(err))
    return { status: 200, message: 'OK', data: obj };
}

async function deleteDoctor(userId) {
    let del = doctors.filter(v => v.id == userId);
    doctors = doctors.filter(v => v.id != userId);
    fs.writeFile('./data/patient.json', JSON.stringify(doctors), (err) => console.log(err))
    return { status: 200, message: 'OK', data: del };
}

module.exports = { getDoctor, getDoctorById, addDoctor, updateAll_docDet, updateDoctor, deleteDoctor };
