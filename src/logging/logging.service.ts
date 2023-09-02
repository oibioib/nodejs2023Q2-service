import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mkdirSync, readdirSync, writeFileSync } from 'fs';
import { EOL } from 'os';
import { join } from 'path';

import {
  LOG_METHODS,
  LOG_METHODS_LEVELS,
  LOG_METHODS_TO_CONSOLE,
} from './logging.constants';
import { COLOR_RESET, COLORS } from './logging.colors';
import { getLogFileName, isDirExist } from './logging.utils';

@Injectable()
export class LoggingService extends ConsoleLogger {
  _logLevel: number;
  _logFileSize: number;
  _logsPath: string;

  constructor(private readonly configService: ConfigService) {
    super();
    this._logLevel = this.configService.get('LOG_LEVEL') || 2;
    this._logFileSize =
      (this.configService.get('LOG_MAX_FILE_SIZE_MB') || 10) * 1024 * 1024;
    this._logsPath = join(process.cwd(), 'logs');
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

  _performLoggingToFile(message: string, logMethod: keyof typeof LOG_METHODS) {
    const isFolderExist = isDirExist(this._logsPath);

    if (!isFolderExist) {
      mkdirSync(this._logsPath);
    }

    const dirContent = readdirSync(this._logsPath, { withFileTypes: true });
    const files: string[] = [];

    dirContent.forEach((item) => {
      if (item.isFile()) {
        files.push(item.name);
      }
    });

    const filename = getLogFileName(
      files,
      logMethod,
      this._logFileSize,
      this._logsPath,
    );

    const logPath = join(this._logsPath, filename);
    writeFileSync(logPath, message, { flag: 'a' });
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

    if (logMethod === LOG_METHODS.REQUEST) {
      return;
    }

    const logMessageToFile = `[ ${logMethod} ] [${new Date().toISOString()}] ${message} ${EOL}`;
    this._performLoggingToFile(logMessageToFile, logMethod);
  }
}
