const { categoryGet, categoryAdd,subCategoryAdd, categoryUpdate, categoryDelete } = require('../controllers/category.controllers');
const { verifyToken } = require('../../../../middlewares/token');
const roleValidator = require('../../../../middlewares/role-validator');
// const { categoryGetSchema, categoryAddSchema, categoryUpdateSchema,categoryGetBySlug } = require('../validator/index');
const validator = require('../../../../middlewares/validator');

const categoryRoutes = async (app) => {

    app.post('/addCategory', verifyToken, roleValidator(['admin']), categoryAdd);

    app.post('/addSubCategory', verifyToken, roleValidator(['admin']), subCategoryAdd);

    app.get('/category', categoryGet);

    // app.put('/category', verifyToken, roleValidator(['admin']), validator(categoryUpdateSchema), categoryUpdate);
    // app.put('/category/:prd_slug', verifyToken, roleValidator(['admin']), categoryUpdate);

    // app.delete('/category/:prd_id', verifyToken, roleValidator(['admin']), categoryDelete);
}

module.exports = categoryRoutes;