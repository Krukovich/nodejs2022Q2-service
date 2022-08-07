import { HttpStatus } from '@nestjs/common';

export type ErrorResponse = {
  statusCode: HttpStatus;
  error: string;
  path: string;
  method: string;
  timeStamp: Date;
};

export enum Logs {
  debug = 0,
  verbose = 1,
  log = 2,
  warn = 3,
  error = 4,
}
