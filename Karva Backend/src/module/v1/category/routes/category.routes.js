const { categoryGet, subCategoryGet, categoryAdd, subCategoryAdd, categoryUpdate,subCategoryUpdate, categoryDelete, subCategoryDelete } = require('../controllers/category.controllers');
const { verifyToken } = require('../../../../middlewares/token');
const roleValidator = require('../../../../middlewares/role-validator');
// const { categoryGetSchema, categoryAddSchema, categoryUpdateSchema,categoryGetBySlug } = require('../validator/index');
const validator = require('../../../../middlewares/validator');

const categoryRoutes = async (app) => {

    app.post('/category', verifyToken, roleValidator(['admin']), categoryAdd);
    app.post('/subCategory', verifyToken, roleValidator(['admin']), subCategoryAdd);

    app.get('/category', categoryGet);
    app.get('/subCategory/:cat_name', subCategoryGet);

    //get by id update and delete

    app.put('/category/:cat_id', verifyToken, roleValidator(['admin']), categoryUpdate);
    app.put('/subCategory', verifyToken, roleValidator(['admin']), subCategoryUpdate);

    app.delete('/category/:cat_id', verifyToken, roleValidator(['admin']), categoryDelete);
    app.delete('/subCategory', verifyToken, roleValidator(['admin']), subCategoryDelete);
}

module.exports = categoryRoutes;