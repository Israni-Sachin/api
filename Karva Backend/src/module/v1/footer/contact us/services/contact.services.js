const contact = require('../../../../../models/footer/contact-us.model');

const contactGet = async () => {

    let result = await contact.find({});
    return result;

}

const contactAdd = async (data) => {

    let check = await contact.find({ contactUs_email: data.contactUs_email });

    if (check.length != 0)
        throw new Error(`Contact email already exists`);
    else
        await contact.create(data);

}

const contactUpdate = async (data) => {

    let check = await contact.findOneAndUpdate({ contactUs_email: data.email }, { contactUs_resolved: data.resolved });
    console.log(check);
    
    return check
    // if (check.length != 0)
    //     throw new Error(`Contact email already exists`);
    // else
    //     await contact.create(data);

}

module.exports = { contactGet, contactAdd,contactUpdate };