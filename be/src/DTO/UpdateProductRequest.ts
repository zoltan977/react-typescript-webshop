import ProductModel, { ProductModelInterface } from '../models/product/product';
import { IsInt, IsPositive, IsString, IsUrl } from '../utils/classValidatorWithErrorMessage';
import { IsCategoryInProductCategories } from '../utils/validationDecorator/isCategoryInProductCategories';
import { IsIdValid } from '../utils/validationDecorator/isIdValid';

export class UpdateProductRequest implements ProductModelInterface {
    @IsString()
    @IsIdValid(ProductModel)
    public _id!: string;
    
    @IsString()
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
