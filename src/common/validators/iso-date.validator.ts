// src/common/validators/iso-date.validator.ts
import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsISO8601(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isISO8601',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: `${propertyName} must be a valid ISO 8601 date string`,
      },
      validator: {
        validate(value: any) {
          return (
            typeof value === 'string' &&
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)
          );
        },
      },
    });
  };
}
