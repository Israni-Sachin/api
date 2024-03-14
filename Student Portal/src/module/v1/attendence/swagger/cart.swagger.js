
const cart = {
    '/cart': {
        get: {
            tags: ['Cart'],
            description: "User Cart",
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
                                        example: 'Cart fetched successfully',
                                    },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            _id: {
                                                type: 'integer',
                                                example: "653f68ba33f561aee8892ed6"
                                            },
                                            cart_fk_user_id: {
                                                type: 'integer',
                                                example: "653ba13b962a2e549acb5f80"
                                            },
                                            cart_items: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    properties: {
                                                        cartitm_fk_prd_id: {
                                                            type: 'object',
                                                            properties: {
                                                                _id: {
                                                                    type: 'integer'
                                                                },
                                                                prd_name: {
                                                                    type: 'string'
                                                                },
                                                                prd_price: {
                                                                    type: 'integer'
                                                                },
                                                                prd_img: {
                                                                    type: 'string'
                                                                }
                                                            }
                                                        },
                                                        cartitm_prd_qty: {
                                                            type: 'integer'
                                                        }
                                                    }
                                                },
                                                example: [
                                                    {
                                                        cartitm_fk_prd_id: {
                                                            _id: "653fa533f57066e13afbb7b4",
                                                            prd_name: "Balaji Wafers – Cream & Onion",
                                                            prd_price: 10,
                                                            prd_img: "https://www.bigbasket.com/media/uploads/p/l/40053581_2-balaji-cream-onion-chips.jpg"
                                                        },
                                                        cartitm_prd_qty: 1
                                                    },
                                                    {
                                                        cartitm_fk_prd_id: {
                                                            _id: "653fa50ef57066e13afbb7ae",
                                                            prd_name: "Balaji Wafers – Tomato Twist",
                                                            prd_price: 10,
                                                            prd_img: "https://www.bigbasket.com/media/uploads/p/xxl/40053584_5-balaji-tomato-masti-chips.jpg"
                                                        },
                                                        cartitm_prd_qty: 1
                                                    }
                                                ]
                                            },
                                            createdAt: {
                                                type: 'string',
                                                example: "2023-10-30T08:26:34.720Z"
                                            },
                                            updatedAt: {
                                                type: 'string',
                                                example: "2023-11-02T13:03:19.332Z"
                                            },
                                            __v: {
                                                type: 'integer',
                                                example: 0
                                            },
                                            cart_itms_qty: {
                                                type: 'integer',
                                                example: 2
                                            },
                                            cart_total_amount: {
                                                type: 'integer',
                                                example: 20
                                            },
                                        }

                                    }
                                }
                            }
                        },
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
            tags: ['Cart'],
            description: "Add a cart",
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                cart_items: {
                                    type: 'array',
                                    items: {
                                        cartitm_fk_prd_id: {
                                            type: 'string'
                                        },
                                        cartitm_prd_qty: {
                                            type: 'integer'
                                        }
                                    },
                                    example: [
                                        {
                                            cartitm_fk_prd_id: "653fa533f57066e13afbb7b4",
                                            cartitm_prd_qty: 1
                                        },
                                        {
                                            cartitm_fk_prd_id: "653fa50ef57066e13afbb7ae",
                                            cartitm_prd_qty: 1
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'Cart Added Successfully',
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
                                        example: 'Success'
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
        },
        delete: {
            tags: ['Cart'],
            description: "Delete cart",
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                cart_items: {
                                    type: 'string',
                                    example: ["653a06d9b59939b33720c9aa", "653fa50ef57066e13afbb7ae"]
                                }
                            }
                        }
                    }
                }
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
                                        example: 200
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'cart Deleted Successfully'
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
        },

    }
}


module.exports = { ...cart }