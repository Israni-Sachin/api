const gallery = require('../../../../../models/homepage/gallery.model');

const galleryGet = async () => {

    let result = await gallery.find({});
    return result;

}

const galleryAdd = async (data) => {

    let check = await gallery.find({});

    if (check.length != 0)
        await gallery.findByIdAndUpdate({ _id: check[0]._id }, data);
    else
        await gallery.create(data);

}

module.exports = { galleryGet, galleryAdd };