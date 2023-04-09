import { equals, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { ErrorMessage } from '../../constants/object/ErrorMessage';
import { getGenericDecoratorFunctionWithProperty } from './utils/getDecoratorFunction';


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

export const PasswordMatch = getGenericDecoratorFunctionWithProperty(MatchConstraint)
  