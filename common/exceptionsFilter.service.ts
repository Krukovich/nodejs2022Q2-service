import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let errorMessage: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse: any = exception.getResponse();
      errorMessage = errorResponse.error || exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Critical internal server error occurred!';
    }

    const errorResponse = this.getErrorResponse(status, errorMessage, request);
    const errorLog = this.getErrorLog(errorResponse, request, exception);
    this.writeErrorLogToFile(errorLog);
    response.status(status).json(errorResponse);
  }

  private getErrorResponse = (
    status: HttpStatus,
    errorMessage: string,
    request: Request,
  ) => ({
    statusCode: status,
    error: errorMessage,
    path: request.url,
    method: request.method,
    timeStamp: new Date(),
  });

  private getErrorLog = (
    errorResponse: any,
    request: Request,
    exception: unknown,
  ): string => {
    const { method, url } = request;
    return `Response Code: ${
      errorResponse.statusCode
    } - Method: ${method} - URL: ${url} - TimeStamp: ${
      errorResponse.timeStamp
    }\n
    ${
      exception instanceof HttpException ? exception.stack : errorResponse.error
    }\n`;
  };

  private writeErrorLogToFile = (errorLog: string): void => {
    fs.appendFile(
      'error.log',
      errorLog,
      'utf8',
      (err: NodeJS.ErrnoException) => {
        if (err) throw err;
      },
    );
  };
}

//TODO REFACTOR THIS FILE
