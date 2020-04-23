import BaseError from './error.base';
import { HTTP_STATUS_CODE, IServerMessage } from '../core';

export default class InternalServerError extends BaseError {
  public constructor(message: IServerMessage, details?: any) {
    super(message, HTTP_STATUS_CODE.INTERNAL_SERVER, details);
  }
}
