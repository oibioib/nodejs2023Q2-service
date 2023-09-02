import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EOL } from 'os';

import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private loggingService: LoggingService) {}

  logRequest(req: Request, res: Response) {
    const { statusCode } = res;
    const { originalUrl, method, query, body, headers } = req;

    const messageData = {
      method: method,
      url: originalUrl,
      headers: JSON.stringify(headers),
      query: JSON.stringify(query),
      body: JSON.stringify(body),
      response_code: statusCode,
    };

    const message = Object.entries(messageData)
      .map(([key, value]) => `${EOL}  ${key.toUpperCase()}: ${value}`)
      .join('');

    return this.loggingService.logRequest(message);
  }

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => this.logRequest(req, res));
    next();
  }
}
