import { IServerMessage } from '../core';

const errorMessage: { [key: string]: IServerMessage } = {
  UNKNOWN: {
    message: 'Oops! Something went wrong on our end. Please try again later.',
    code: 'ERROR_UNKNOWN',
  },
  UNAUTHORIZED: {
    message: 'You have not permission to perform this Action.',
    code: 'ERROR_UNAUTHORIZED',
  },
  NOT_FOUND: {
    message: 'Element not Found.',
    code: 'ERROR_NOT_FOUND',
  },
  DUPLICATED: {
    message: 'Element name already exists.',
    code: 'DUPLICATED',
  },
};

export default errorMessage;
