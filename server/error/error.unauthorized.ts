import BaseError from './error.base';
import { HTTP_STATUS_CODE, IServerMessage } from '../core';

export default class UnauthorizedError extends BaseError {
  public constructor(message: IServerMessage, details?: any) {
    super(message, HTTP_STATUS_CODE.UNAUTHORIZED, details);
  }
}
