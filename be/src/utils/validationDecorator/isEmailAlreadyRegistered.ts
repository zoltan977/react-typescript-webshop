import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { ErrorMessage } from '../../constants/object/ErrorMessage';
import UserModel from '../../models/user/user';
import { getDecoratorFunction } from './utils/getDecoratorFunction';

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyRegisteredConstraint implements ValidatorConstraintInterface {

    async validate(email: string, args: ValidationArguments): Promise<boolean> {
        const user = await UserModel.findOne({ email });

        if (user) {
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    }

    defaultMessage(validationArguments: ValidationArguments): string {
        return ErrorMessage.USER_EMAIL_ALREADY_EXISTS;
    }
}

export const IsEmailAlreadyRegistered = getDecoratorFunction(IsEmailAlreadyRegisteredConstraint);
