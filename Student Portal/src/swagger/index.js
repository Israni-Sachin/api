require('dotenv').config();
const authSwagger = require('../module/v1/auth/swagger/auth.swagger');
const productSwagger = require('../module/v1/product/swagger/product.swagger');
const orderSwagger = require('../module/v1/order/swagger/order.swagger');
const orderHistorySwagger = require('../module/v1/order-history/swagger/order-history.swagger');
const cartSwagger = require('../module/v1/cart/swagger/cart.swagger');
const userSwagger = require('../module/v1/user/swagger/user.swagger');

const apiDocs = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'Orderfiy API',
        description: 'API Information',
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT}`,
            description: 'Development server',
        },
        {
            url: `https://orderify-qebp.onrender.com`,
            description: 'Production server',
        }
    ],
    paths: { ...authSwagger,...userSwagger, ...productSwagger,...cartSwagger, ...orderSwagger, ...orderHistorySwagger },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'Authorization'
            }
        },
    },
    security: [{
        bearerAuth: []
    }]
};

module.exports = { apiDocs }
