import { HTTP_STATUS_CODE } from './core.constants';

export interface IServerMessage {
  code: string;
  message: string;
}

export interface IServerResponse {
  serverMessage: IServerMessage;
  statusCode: HTTP_STATUS_CODE;
}
