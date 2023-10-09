const db = require('../../../../db/db.con')

const studentAdd = async (data) => {
    const fields = ['st_first_name', 'st_last_name', 'st_dept'];
    const placeholders = '?,'.repeat(fields.length).replace(/,$/, '');
    const query = `INSERT INTO student
                (${fields.join()}) VALUES
                (${placeholders})`

    const result = await db.query(query, [data.st_first_name, data.st_last_name, data.st_dept])
}
const studentAll = async () => {
    const query = `Select * from student`
    const result = await db.query(query)
    return result[0];
}

const studentGet = async (data) => {
    const query = `Select * from student where st_id=${data}`
    const result = await db.query(query)
    return result[0];
}

const studentUpdate = async (userId, data) => {
    const user = await studentGet(userId);
    console.log(user);
    const query = `UPDATE student 
                   SET st_first_name = ?, st_last_name = ?, st_dept=? 
                   WHERE st_id = ${userId} `
    console.log(userId);
    const result = await db.query(query, [data.st_first_name || user[0].st_first_name, data.st_last_name || user[0].st_last_name, data.st_dept || user[0].st_dept])
    return result[0];
}

const studentDelete = async (data) => {
    const query = `Delete from student where st_id=${data}`
    const result = await db.query(query)
    return result[0];
}
module.exports = { studentAdd, studentAll, studentGet, studentUpdate, studentDelete }