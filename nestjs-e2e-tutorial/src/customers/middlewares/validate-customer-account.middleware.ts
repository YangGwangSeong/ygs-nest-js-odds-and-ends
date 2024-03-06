import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustomerAccountMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { validAccount } = req.headers;
    if (validAccount) {
      next();
    } else {
      res.status(401).send({ error: 'Account is invalid' });
    }
  }
}
