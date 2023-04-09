import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { ErrorMessage } from '../../constants/object/ErrorMessage';
import UserModel from '../../models/user/user';
import { getDecoratorFunction } from './utils/getDecoratorFunction';

@ValidatorConstraint({ async: true })
export class IsUserEmailInUserCollectionConstraint implements ValidatorConstraintInterface {

    async validate(userEmail: string, args: ValidationArguments): Promise<boolean> {
        const userItem = await UserModel.findOne({email: userEmail});

        if (!userItem) {
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    }

    defaultMessage(validationArguments: ValidationArguments): string {
        return ErrorMessage.NOT_A_VALID_USER;
    }
}

export const IsUserEmailInUserCollection = getDecoratorFunction(IsUserEmailInUserCollectionConstraint);
