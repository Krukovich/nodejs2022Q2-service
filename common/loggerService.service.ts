import { LoggerService } from '@nestjs/common';

export class ApplicationLogger implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    console.log(
      '\x1b[36m%s\x1b[0m',
      message,
      '\x1b[33m%s\x1b[0m',
      ...optionalParams,
    );
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {}
}
