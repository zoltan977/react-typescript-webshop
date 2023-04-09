import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { ErrorMessage } from '../../constants/object/ErrorMessage';
import CategoryModel from '../../models/category/category';
import { getDecoratorFunction } from './utils/getDecoratorFunction';

@ValidatorConstraint({ async: true })
export class IsCategoryInProductCategoriesConstraint implements ValidatorConstraintInterface {

    async validate(category: string, args: ValidationArguments): Promise<boolean> {
        const categoryItem = await CategoryModel.findOne({ name: category });

        if (!categoryItem) {
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    }

    defaultMessage(validationArguments: ValidationArguments): string {
        return ErrorMessage.NOT_A_VALID_CATEGORY;
    }
}

export const IsCategoryInProductCategories = getDecoratorFunction(IsCategoryInProductCategoriesConstraint);