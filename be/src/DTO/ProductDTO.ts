import ProductModel, { ProductModelInterface } from '../models/product/product';
import { IsInt, IsPositive, IsString, IsUrl } from '../utils/classValidatorWithErrorMessage';
import { IsIdValid } from '../utils/validationDecorator/isIdValid';

export class ProductDTO implements ProductModelInterface {
    @IsString()
    @IsIdValid(ProductModel)
    public _id!: string;

    @IsString()
    public title!: string;

    @IsInt()
    @IsPositive()
    public price!: number;

    @IsString()
    public category!: string;

    @IsUrl()
    public imageURL!: string;
}
