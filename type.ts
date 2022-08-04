import { HttpStatus } from '@nestjs/common';

export type ErrorResponse = {
  statusCode: HttpStatus;
  error: string;
  path: string;
  method: string;
  timeStamp: Date;
};
