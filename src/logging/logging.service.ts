import { ConsoleLogger, Injectable } from '@nestjs/common';
import { colors, colorReset } from './logging.colors';

@Injectable()
export class LoggingService extends ConsoleLogger {
  log(message: any) {
    console.log(
      `${colors.cyan}[ LOG ]${colorReset} [${this._getTime()}] ${message}`,
    );
  }

  error(message: any) {
    console.error(
      `${colors.red}[ ERROR ]${colorReset} [${this._getTime()}] ${message}`,
    );
  }

  warn(message: any) {
    console.warn(
      `${colors.magenta}[ WARN ]${colorReset} [${this._getTime()}] ${message}`,
    );
  }

  debug(message: any) {
    console.debug(
      `${colors.green}[ DEBUG ]${colorReset} [${this._getTime()}] ${message}`,
    );
  }

  verbose(message: any) {
    console.log(
      `${
        colors.yellow
      }[ VERBOSE ]${colorReset} [${this._getTime()}] ${message}`,
    );
  }

  logRequest(message: any) {
    console.log(
      `${colors.blue}[ REQUEST ]${colorReset} [${this._getTime()}] ${message}`,
    );
  }

  _getTime() {
    return new Date().toISOString();
  }
}
