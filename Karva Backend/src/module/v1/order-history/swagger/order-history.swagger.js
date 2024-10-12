
const orderHistorySwagger = {
    '/order-history': {
        post: {
            tags: ['Order History'],
            description: 'Get User Order History',
            security: [
                {
                    bearerAuth: [],
                },
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                start_date: {
                                    type: 'string',
                                    example: '05/11/2023',
                                },
                                end_date: {
                                    type: 'string',
                                    example: '15/11/2023',
                                },
                            },
                        },
                    }
                }
            },
            responses: {
                200: {
                    description: 'Get User Order History',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: '200',
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Success',
                                    },
                                    data: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                prd_total_qty: {
                                                    type: 'integer',
                                                    example: 2,
                                                },
                                                prd_total_amount: {
                                                    type: 'integer',
                                                    example: 20,
                                                },
                                                product_details: {
                                                    type: 'object',
                                                    properties: {
                                                        _id: {
                                                            type: 'string',
                                                            example: '653fa553f57066e13afbb7ba',
                                                        },
                                                        prd_name: {
                                                            type: 'string',
                                                            example: 'Balaji wafers – Crunchex',
                                                        },
                                                        prd_price: {
                                                            type: 'integer',
                                                            example: 10,
                                                        },
                                                        prd_img: {
                                                            type: 'string',
                                                            example: 'https://dtgxwmigmg3gc.cloudfront.net/imagery/assets/derivations/icon/256/256/true/eyJpZCI6ImQzNDNhMjUxMjMwZjkzNDVhOGQ4YzJmZDdlZmY2MWYyIiwic3RvcmFnZSI6InB1YmxpY19zdG9yZSJ9?signature=f5923c255f5f5fc7e519455378af579e942c61cc57a7cc1ba13493c16cce2258'
                                                        },
                                                        createdAt: {
                                                            type: 'string',
                                                            example: '2023-10-30T12:45:07.993Z'
                                                        },
                                                        updatedAt: {
                                                            type: 'string',
                                                            example: '2023-10-30T12:45:07.993Z'
                                                        },
                                                        __v: {
                                                            type: 'integer',
                                                            example: 0
                                                        }
                                                    }
                                                },
                                                users: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'object',
                                                        properties: {
                                                            user_data: {
                                                                type: 'object',
                                                                properties: {
                                                                    user_fname: {
                                                                        type: 'string',
                                                                    },
                                                                    user_lname: {
                                                                        type: 'string'
                                                                    }
                                                                }
                                                            },
                                                            prd_qty: {
                                                                type: 'integer',
                                                            }
                                                        }
                                                    },
                                                    example: [
                                                        {
                                                            "user_data": {
                                                                "user_fname": "Prakhar",
                                                                "user_lname": "Tripathi"
                                                            },
                                                            "prd_qty": 1
                                                        },
                                                        {
                                                            "user_data": {
                                                                "user_fname": "rudra",
                                                                "user_lname": "solanki"
                                                            },
                                                            "prd_qty": 1
                                                        }
                                                    ]
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    },
                },
                401: {
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
                500: {
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
            },
        },
    },
}

module.exports = orderHistorySwagger;
