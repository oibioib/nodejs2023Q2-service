import { HttpAdapterHost, APP_FILTER } from '@nestjs/core';
import { EOL } from 'os';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { LoggingService } from 'src/logging/logging.service';

@Catch()
export class AppExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly loggingService: LoggingService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const httpMessage =
      exception instanceof HttpException
        ? exception.message
        : 'Internal Server Error';

    const responseBody = {
      success: false,
      statusCode: httpStatus,
      message: httpMessage,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    const exceptionStack = exception instanceof Error ? exception.stack : '';
    const exceptionStackMessage = exceptionStack
      ? `${EOL}  STACK: ${exceptionStack}`
      : '';

    const logMessage = `${EOL}  MESSAGE: ${httpMessage}${exceptionStackMessage}`;

    this.loggingService.error(logMessage);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

export default {
  provide: APP_FILTER,
  useClass: AppExceptionsFilter,
};
