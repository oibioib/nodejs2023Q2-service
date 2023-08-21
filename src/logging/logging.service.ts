import { ConsoleLogger, Injectable } from '@nestjs/common';
import { COLOR_RESET, COLORS } from './logging.colors';
import {
  LOG_METHODS,
  LOG_METHODS_LEVELS,
  LOG_METHODS_TO_CONSOLE,
} from './logging.constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggingService extends ConsoleLogger {
  _logLevel: number;

  constructor(private readonly configService: ConfigService) {
    super();
    this._logLevel = this.configService.get('LOG_LEVEL') || 2;
  }

  log(message: any) {
    this._performLogging(LOG_METHODS.LOG, message, COLORS.CYAN);
  }

  error(message: any) {
    this._performLogging(LOG_METHODS.ERROR, message, COLORS.RED);
  }

  warn(message: any) {
    this._performLogging(LOG_METHODS.WARN, message, COLORS.MAGENTA);
  }

  debug(message: any) {
    this._performLogging(LOG_METHODS.DEBUG, message, COLORS.GREEN);
  }

  verbose(message: any) {
    this._performLogging(LOG_METHODS.VERBOSE, message, COLORS.YELLOW);
  }

  logRequest(message: any) {
    this._performLogging(LOG_METHODS.REQUEST, message, COLORS.BLUE);
  }

  _performLogging(
    logMethod: keyof typeof LOG_METHODS,
    message: string,
    color: COLORS,
  ) {
    if (LOG_METHODS_LEVELS[logMethod] > this._logLevel) {
      return;
    }

    const logMessage = `${color}[ ${logMethod} ]${COLOR_RESET} [${new Date().toISOString()}] ${message}`;
    const consoleMethod = LOG_METHODS_TO_CONSOLE[logMethod];
    console[consoleMethod](logMessage);
  }
}
