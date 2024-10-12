const userSwagger = {
    '/user': {
        get: {
            tags: ['User'],
            description: 'User Profile Fetched',
            security: [{
                bearerAuth: []
            }],
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
                                        example: 'User Profile fetched successfully',
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
        put: {
            tags: ['User'],
            description: 'Update User Profile',
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
                                user_fname: {
                                    type: 'string',
                                    example: "",
                                },
                                user_lname: {
                                    type: 'string',
                                    example: "",
                                },
                                user_email: {
                                    type: 'string',
                                    example: '',
                                },
                                user_phone: {
                                    type: 'integer',
                                    example: '',
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
                                        example: 'User Profile Updated successfully',
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
        }
    }
}

module.exports = userSwagger;
