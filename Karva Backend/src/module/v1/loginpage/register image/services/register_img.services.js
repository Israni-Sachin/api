const registerImg = require('../../../../../models/loginpage/register_img.model');

const registerImgGet = async () => {

    let result = await registerImg.find({});
    return result;

}

const registerImgAdd = async (data) => {

    let check = await registerImg.find({});

    if (check.length != 0)
        await registerImg.findByIdAndUpdate({ _id: check[0]._id }, data);
    else
        await registerImg.create(data);

}

module.exports = { registerImgGet, registerImgAdd };