import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { ErrorMessage } from '../../constants/object/ErrorMessage';
import ProductModel from '../../models/product/product';
import { getDecoratorFunction } from './utils/getDecoratorFunction';

@ValidatorConstraint({ async: true })
export class IsProductTitleAlreadyExistConstraint implements ValidatorConstraintInterface {

    async validate(title: string, args: ValidationArguments): Promise<boolean> {
        const product = await ProductModel.findOne({ title });

        if (product) {
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    }

    defaultMessage(validationArguments: ValidationArguments): string {
        return ErrorMessage.PRODUCT_TITLE_ALREADY_EXISTS;
    }
}

export const IsProductTitleAlreadyExist = getDecoratorFunction(IsProductTitleAlreadyExistConstraint);