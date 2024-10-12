
const order = {
    '/order': {
        get: {
            tags: ['Order'],
            description: "All orders",
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
                                                        prd_total_qty: 4,
                                                        prd_total_amount: 160,
                                                        product_details: {
                                                            _id: "65434aea0fd0a753fdeebaf5",
                                                            prd_name: "Chesse Vadapv",
                                                            prd_price: 40,
                                                            prd_img: "https://foodel.in/wp-content/uploads/2023/04/CHeese-Vada-Pav.png",
                                                            createdAt: "2023-11-02T07:08:26.088Z",
                                                            updatedAt: "2023-11-02T07:08:26.088Z",
                                                            __v: 0
                                                        },
                                                        users: [
                                                            {
                                                                user_data: {
                                                                    user_fname: "Bhaumik",
                                                                    user_lname: "Panchal"
                                                                },
                                                                prd_qty: 4
                                                            }
                                                        ],
                                                        id: "65434aea0fd0a753fdeebaf5"
                                                    },
                                                    {
                                                        prd_total_qty: 15,
                                                        prd_total_amount: 150,
                                                        product_details: {
                                                            _id: "653fa53ff57066e13afbb7b7",
                                                            prd_name: "Balaji Wafers - Flamin Hot Nachos",
                                                            prd_price: 10,
                                                            prd_img: "https://adasglobal.com/files/cache/catalog/Balaji/nachos-500x500.png",
                                                            createdAt: "2023-10-30T12:44:47.268Z",
                                                            updatedAt: "2023-10-30T12:44:47.268Z",
                                                            __v: 0
                                                        },
                                                        users: [
                                                            {
                                                                user_data: {
                                                                    user_fname: "rudra",
                                                                    user_lname: "solanki"
                                                                },
                                                                prd_qty: 15
                                                            }
                                                        ],
                                                        id: "653fa53ff57066e13afbb7b7"
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
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
                    description: 'Data not found',
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
                                        example: 'Data not found',
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
        post: {
            tags: ['Order'],
            description: "Add a product",
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
                                        example: 200
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Order Added Successfully'
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
                            }
                        }
                    }
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


module.exports = { ...order }