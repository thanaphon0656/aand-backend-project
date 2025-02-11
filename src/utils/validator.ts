import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  
  
  @ValidatorConstraint({ async: true })
  export class IsValueNullForParam implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
      return value !== null && value !== 'null'
    }
  }
  
  @ValidatorConstraint({ async: true })
  export class IsValueNull implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
      return value !== null;
    }
  }
  
  export function CustomIsNullForParam(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsValueNullForParam,
      });
    };
  }
  
  @ValidatorConstraint({ async: true })
  export class IsValueUndefinedForParam implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
      return value !== undefined && value!=='undefined' && !value.includes(':');;
    }
  }
  
  export function CustomIsDefinedParam(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsValueUndefinedForParam,
      });
    };
  }
  
  export function CustomIsNull(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsValueNull,
      });
    };
  }
  
  @ValidatorConstraint({ async: true })
  export class IsValueUndefined implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
      return value !== undefined;
    }
  }
  
  export function CustomIsDefined(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsValueUndefined,
      });
    };
  }