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
  'ALREADY_EXISTS': {
    'CODE': 2,
    'DEFAULT_MESSAGE': 'Already exists.',
    'HTTP_CODE': 409
  },
  'SERVER_ERROR': {
    'CODE': 3,
    'DEFAULT_MESSAGE': 'Server error. Please try again after some time.',
    'HTTP_CODE': 500
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
  }

}

module.exports = { ERRORS };