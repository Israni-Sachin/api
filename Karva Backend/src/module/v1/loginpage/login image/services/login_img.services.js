const loginImg = require('../../../../../models/loginpage/login_img.model');

const loginImgGet = async () => {

    let result = await loginImg.find({});
    return result;

}

const loginImgAdd = async (data) => {

    let check = await loginImg.find({});

    if (check.length != 0)
        await loginImg.findByIdAndUpdate({ _id: check[0]._id }, data);
    else
        await loginImg.create(data);

}

module.exports = { loginImgGet, loginImgAdd };