const productSwagger = {
    '/product/pagging': {
        post: {
            tags: ['Product'],
            description: 'Fetch all products',
            security: [{
                bearerAuth: []
            }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                limit: {
                                    type: 'integer',
                                    example: 3,
                                },
                                page: {
                                    type: 'integer',
                                    example: 1,
                                },
                                search: {
                                    type: 'string',
                                    example: 'Balaji',
                                }
                            },
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: 200,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Product fetched successfully',
                                    },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            products: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    properties: {
                                                        _id: {
                                                            type: 'integer',
                                                        },
                                                        prd_name: {
                                                            type: 'string',
                                                        },
                                                        prd_price: {
                                                            type: 'integer',
                                                        },
                                                        prd_image: {
                                                            type: 'string',
                                                        },
                                                    },

                                                },
                                                example: [
                                                    {
                                                        _id: "653fa50ef57066e13afbb7ae",
                                                        prd_name: 'Balaji Wafers – Tomato Twist',
                                                        prd_price: 10,
                                                        prd_image: 'https://www.bigbasket.com/media/uploads/p/xxl/40053584_5-balaji-tomato-masti-chips.jpg',
                                                    },
                                                    {
                                                        _id: "653fa525f57066e13afbb7b1",
                                                        prd_name: 'Balaji Wafers – Masala Masti',
                                                        prd_price: 10,
                                                        prd_image: 'https://bachatkart.in/image/cache/catalog/Balaji/masala%20masti-700x700.png',
                                                    },
                                                    {
                                                        _id: "653fa533f57066e13afbb7b4",
                                                        prd_name: "Balaji Wafers – Cream & Onion",
                                                        prd_price: 10,
                                                        prd_img: "https://www.bigbasket.com/media/uploads/p/l/40053581_2-balaji-cream-onion-chips.jpg"
                                                    }
                                                ],
                                            },
                                            total_page: {
                                                type: 'integer',
                                                example: 5,
                                            },
                                            total_products: {
                                                type: 'integer',
                                                example: 15,
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                '401': {
                    description: 'Unauthorized',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: 401,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Unauthorized',
                                    },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: 500,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Internal Server Error',
                                    },
                                },
                            },
                        },
                    },
                },
            }
        },
    },
    '/product': {
        'post': {
            tags: ['Product'],
            description: 'Add product',
            security: [{
                bearerAuth: []
            }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                prd_name: {
                                    type: 'string',
                                    example: 'Balaji Wafers – Tomato Twist',
                                },
                                prd_price: {
                                    type: 'integer',
                                    example: 10,
                                },
                                prd_image: {
                                    type: 'string',
                                    example: 'https://www.bigbasket.com/media/uploads/p/xxl/40053584_5-balaji-tomato-masti-chips.jpg',
                                }
                            },
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: 200,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Product added successfully',
                                    },
                                }
                            }
                        }
                    }
                },
                '401': {
                    description: 'Unauthorized',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: 401,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Unauthorized',
                                    },
                                },
                            },
                        },
                    },
                },
                '409': {
                    description: 'Conflict',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: 409,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Product already exist',
                                    },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: 500,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Internal Server Error',
                                    },
                                },
                            },
                        },
                    },
                },
            }
        },
        'put': {
            tags: ['Product'],
            description: 'Update product',
            security: [{
                bearerAuth: []
            }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                prd_id: {
                                    type: 'string',
                                    example: '653fa50ef57066e13afbb7ae',
                                },
                                prd_name: {
                                    type: 'string',
                                    example: 'Balaji Wafers – Tomato Twist',
                                },
                                prd_price: {
                                    type: 'integer',
                                    example: 10,
                                },
                                prd_image: {
                                    type: 'string',
                                    example: 'https://www.bigbasket.com/media/uploads/p/xxl/40053584_5-balaji-tomato-masti-chips.jpg',
                                },
                                prd_is_visible: {
                                    type: 'boolean',
                                    example: true,
                                }
                            },
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: 200,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Product updated successfully',
                                    },
                                }
                            }
                        }
                    }
                },
                '401': {
                    description: 'Unauthorized',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: 401,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Unauthorized',
                                    },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Product not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: 404,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Product not found',
                                    },
                                },
                            },
                        },
                    },
                },
                '409':{
                    description: 'Conflict',
                    content:{
                        'application/json':{
                            schema:{
                                type:'object',
                                properties:{
                                    status:{
                                        type:'integer',
                                        example:409,
                                    },
                                    message:{
                                        type:'string',
                                        example:'Product already exist',
                                    },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: 500,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Internal Server Error',
                                    },
                                },
                            },
                        },
                    },
                },
            }
        },
        'delete': {
            tags: ['Product'],
            description: 'Delete product',
            security: [{
                bearerAuth: []
            }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                prd_ids: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                        example: '653fa50ef57066e13afbb7ae',
                                    },
                                    example: [
                                        '653fa50ef57066e13afbb7ae',
                                        '653fa525f57066e13afbb7b1',
                                        '653fa533f57066e13afbb7b4',
                                    ],
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: 200,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Product deleted successfully',
                                    },
                                }
                            }
                        }
                    }
                },
                '401': {
                    description: 'Unauthorized',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: 401,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Unauthorized',
                                    },
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Product not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: 404,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Product not found',
                                    },
                                },
                            },
                        },
                    },
                },
                '500': {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: 500,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Internal Server Error',
                                    },
                                },
                            },
                        },
                    },
                },
            }
        }
    }
}

module.exports = productSwagger;
