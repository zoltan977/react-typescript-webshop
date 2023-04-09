import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { ErrorMessage } from '../../constants/object/ErrorMessage';
import { getDecoratorFunctionWithParameter } from './utils/getDecoratorFunction';


@ValidatorConstraint({ async: true })
export class IsIdValidConstraint implements ValidatorConstraintInterface {
  async validate(id: string, args: ValidationArguments): Promise<boolean> {
    const [model] = args.constraints;
    let doc: any = false;
    try {
      doc = model?.findOne ? await model?.findById(id) : false;
    } catch (error) {
      return Promise.resolve(false);
    }

    if (doc) {
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
}

  defaultMessage(validationArguments: ValidationArguments): string {
      return ErrorMessage.NOT_A_VALID_ID;
  }
}

export const IsIdValid = getDecoratorFunctionWithParameter(IsIdValidConstraint)
  