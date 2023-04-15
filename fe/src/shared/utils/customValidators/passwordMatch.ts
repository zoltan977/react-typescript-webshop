import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    equals,
    ValidationOptions,
    registerDecorator,
  } from 'class-validator';
import { ErrorMessage } from '../../constants/errorMessage';
  
  export const PasswordMatch =
    <T>(property: keyof T, options?: ValidationOptions) =>
    (object: any, propertyName: string) =>
      registerDecorator({
        target: object.constructor,
        propertyName,
        options,
        constraints: [property],
        validator: MatchConstraint,
      });
      
  @ValidatorConstraint({ name: 'PasswordMatch' })
  export class MatchConstraint implements ValidatorConstraintInterface {
    validate(value: any, validationArguments: ValidationArguments): boolean {
        const [relatedPropertyName] = validationArguments.constraints;
        const relatedValue = (validationArguments.object as any)[relatedPropertyName];
        return equals(relatedValue, value);
    }
  
    defaultMessage(validationArguments: ValidationArguments): string {
        return ErrorMessage.PASSWORDS_DO_NOT_MATCH;
    }
  }
  