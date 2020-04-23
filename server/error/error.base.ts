import get from 'lodash/get';

import errorMessage from './error.messages';
import { HTTP_STATUS_CODE, IServerMessage } from '../core';

export default class BaseError {
  public description: string;
  public message: string;
  public statusCode: number;
  public code: string;

  public constructor(
    serverMessage: IServerMessage = errorMessage.UNKNOWN,
    statusCode = HTTP_STATUS_CODE.INTERNAL_SERVER,
    details?: any
  ) {
    this.code = serverMessage.code;
    this.description = get(details, 'stack', get(details, 'message', details));
    this.message = serverMessage.message;
    this.statusCode = statusCode;
  }
}
