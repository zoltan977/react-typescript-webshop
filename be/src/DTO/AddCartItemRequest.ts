import 'reflect-metadata';

import { Type } from 'class-transformer';
import { IsDefined, IsOptional, ValidateNested } from 'class-validator';

import { ProductModelInterface } from '../models/product/product';
import { IsString } from '../utils/classValidatorWithErrorMessage';
import { ProductDTO } from './ProductDTO';

export interface AddCartItemRequestInterface {
    cartId?: string;
    product: ProductModelInterface;
}

export class AddCartItemRequest implements AddCartItemRequestInterface {
    @IsString()
    @IsOptional()
    public cartId!: string;

    @IsDefined()
    @ValidateNested()
    @Type(() => ProductDTO)
    public product!: ProductDTO;
}
