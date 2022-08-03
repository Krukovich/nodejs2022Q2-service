import { Injectable, Scope, LoggerService } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class ApplicationLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {}

  error(message: any, ...optionalParams: any[]): any {}

  warn(message: any, ...optionalParams: any[]): any {}
}
