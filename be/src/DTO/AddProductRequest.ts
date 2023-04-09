import { IsInt, IsPositive, IsString, IsUrl } from '../utils/classValidatorWithErrorMessage';
import { IsCategoryInProductCategories } from '../utils/validationDecorator/isCategoryInProductCategories';
import { IsProductTitleAlreadyExist } from '../utils/validationDecorator/isProductTitleAlreadyExist';

export interface AddProductRequestInterface {
    title: string;
    price: number;
    category: string;
    imageURL: string;
}

export class AddProductRequest implements AddProductRequestInterface {
    @IsString()
    @IsProductTitleAlreadyExist()
    public title!: string;

    @IsInt()
    @IsPositive()
    public price!: number;

    @IsString()
    @IsCategoryInProductCategories()
    public category!: string;

    @IsUrl()
    public imageURL!: string;
}
