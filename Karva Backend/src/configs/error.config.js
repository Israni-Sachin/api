const ERRORS = {
  'DEFAULT_ERROR': {
    'CODE': 0,
    'DEFAULT_MESSAGE': 'Internal server error.',
    'HTTP_CODE': 500
  },
  'DATA_NOT_FOUND': {
    'CODE': 1,
    'DEFAULT_MESSAGE': 'Data is not found',
    'HTTP_CODE': 404
  },
  'ALREADY_EXISTS_EMAIL': {
    'CODE': 2,
    'DEFAULT_MESSAGE': 'Email Address Already exists.',
    'HTTP_CODE': 409
  },
  'SERVER_ERROR': {
    'CODE': 3,
    'DEFAULT_MESSAGE': 'Server error. Please try again after some time.',
    'HTTP_CODE': 500
  },
  'ALREADY_EXISTS_NUMBER': {
    'CODE': 4,
    'DEFAULT_MESSAGE': 'Phone Number Already exists.',
    'HTTP_CODE': 409
  },
  'ALREADY_ADMIN': {
    'CODE': 5,
    'DEFAULT_MESSAGE': 'User is already admin.',
    'HTTP_CODE': 409
  },
  'ALREADY_EXISTS': {
    'CODE': 6,
    'DEFAULT_MESSAGE': 'Already exists.',
    'HTTP_CODE': 409
  },
  'USER_NOT_FOUND': {
    'CODE': 7,
    'DEFAULT_MESSAGE': 'User not found',
    'HTTP_CODE': 404
  },
  'CART_NOT_FOUND': {
    'CODE': 8,
    'DEFAULT_MESSAGE': 'Cart not found',
    'HTTP_CODE': 404
  },
  'INVALID_CREDENTIALS': {
    'CODE': 9,
    'DEFAULT_MESSAGE': 'Invalid credentials.',
    'HTTP_CODE': 400
  },
  'UNAUTHORIZED': {
    'CODE': 10,
    'DEFAULT_MESSAGE': 'Unauthorized.',
    'HTTP_CODE': 401
  },
  'AUTH_NOT_FOUND': {
    'CODE': 11,
    'DEFAULT_MESSAGE': 'authorization token not found.',
    'HTTP_CODE': 401
  },
  'MAX_QTY_EXCEEDED': {
    'CODE': 12,
    'DEFAULT_MESSAGE': 'Maximum quantity exceeded.',
    'HTTP_CODE': 400
  },
  'INVALID_DATA': {
    'CODE': 13,
    'DEFAULT_MESSAGE': 'Invalid data.',
    'HTTP_CODE': 422,
  },
  'CATEGORY_NOT_FOUND': {
    'CODE': 14,
    'DEFAULT_MESSAGE': 'Category not found.',
    'HTTP_CODE': 400
  },
  'EMAIL_NOT_FOUND': {
    'CODE': 14,
    'DEFAULT_MESSAGE': 'Email address not found.',
    'HTTP_CODE': 400
  },

}

module.exports = { ERRORS };