
const auth = {
    '/register': {
        post: {
            tags: ['Auth'],
            description: "Register a new user",
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                user_fname: {
                                    type: 'string',
                                    example: 'John'
                                },
                                user_lname: {
                                    type: 'string',
                                    example: 'Doe'
                                },
                                user_email: {
                                    type: 'string',
                                    example: 'johndoe@example.com'
                                },
                                user_pass: {
                                    type: 'string',
                                    example: 'John@123'
                                },
                                user_phone: {
                                    type: 'string',
                                    example: '1234567890'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'Register successfully',
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
                                        example: 'Register successfully'
                                    },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            _id: {
                                                type: 'string',
                                                example: '654231d85a7636351663c134'
                                            },
                                            user_fname: {
                                                type: 'string',
                                                example: 'John'
                                            },
                                            user_lname: {
                                                type: 'string',
                                                example: 'Doe'
                                            },
                                            user_role: {
                                                type: 'string',
                                                example: 'user'
                                            },
                                            user_email: {
                                                type: 'string',
                                                example: 'johndoe@example.com'
                                            },
                                            user_phone: {
                                                type: 'string',
                                                example: '1234567890'
                                            },
                                            createdAt: {
                                                type: 'string',
                                                example: '2023-11-01T11:09:12.201Z'
                                            },
                                            updatedAt: {
                                                type: 'string',
                                                example: '2023-11-01T11:09:12.201Z'
                                            },
                                            __v: {
                                                type: 'integer',
                                                example: 0
                                            }
                                        }
                                    },
                                    token: {
                                        type: 'string',
                                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDIzMWQ4NWE3NjM2MzUxNjYzYzEzNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk4ODM3MDA4LCJleHAiOjE2OTg5MjM0MDh9.0hH3THkImiH1-N_zKza8p6jrwBX2Ua6gOxZc0cShn1w'
                                    }
                                }
                            }
                        }
                    }
                },
                '409': {
                    description: 'User already exists',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: 409
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'User already exists'
                                    }
                                }
                            }
                        }
                    }
                },
                '500': {
                    description: 'Internal server error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: 500
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Internal server error'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    '/login': {
        post: {
            tags: ['Auth'],
            description: "Login a user",
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                user_email: {
                                    type: 'string',
                                    example: ''
                                },
                                user_pass: {
                                    type: 'string',
                                    example: ''
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'Login successfully',
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
                                        example: 'Login successfully'
                                    },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            _id: {
                                                type: 'string',
                                                example: '654231d85a7636351663c134'
                                            },
                                            user_fname: {
                                                type: 'string',
                                                example: 'John'
                                            },
                                            user_lname: {
                                                type: 'string',
                                                example: 'Doe'
                                            },
                                            user_role: {
                                                type: 'string',
                                                example: 'user'
                                            },
                                            user_email: {
                                                type: 'string',
                                                example: 'johndoe@example.com'
                                            },
                                            user_phone: {
                                                type: 'string',
                                                example: '1234567890'
                                            },
                                            createdAt: {
                                                type: 'string',
                                                example: '2023-11-01T11:09:12.201Z'
                                            },
                                            updatedAt: {
                                                type: 'string',
                                                example: '2023-11-01T11:09:12.201Z'
                                            },
                                            __v: {
                                                type: 'integer',
                                                example: 0
                                            }
                                        }
                                    },
                                    token: {
                                        type: 'string',
                                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDIzMWQ4NWE3NjM2MzUxNjYzYzEzNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk4ODM3MDA4LCJleHAiOjE2OTg5MjM0MDh9.0hH3THkImiH1-N_zKza8p6jrwBX2Ua6gOxZc0cShn1w'
                                    },
                                }
                            }
                        }
                    }
                },
                '400': {
                    description: 'Invalid credentials',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: 400
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Invalid credentials'
                                    }
                                }
                            }
                        }
                    }
                },
                '500': {
                    description: 'Internal server error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: 500
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Internal server error'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}



module.exports = { ...auth }