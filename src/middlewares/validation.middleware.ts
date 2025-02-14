import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpException } from './../exceptions/HttpException';

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req, res, next) => {
    if (Object.keys(req[value]).length == 0) {
      next(new HttpException(400, `Validation error: \"data\" is required`));
    }
    validate(plainToClass(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message: string[] = errors.map((error: ValidationError) => Object.values(error.constraints))[0];
        next(new HttpException(400, message[0]));
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
