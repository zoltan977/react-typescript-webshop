import 'reflect-metadata';

import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';

import { Product } from './product.model';
import { IsNumber } from '../utils/classValidatorWithErrorMessage';

export class ShoppingCartItem {

    @IsDefined()
    @ValidateNested()
    @Type(() => Product)
    public readonly product: Product;

    @IsNumber()
    public readonly quantity: number;

    constructor(init: ShoppingCartItem) {
        Object.assign(this, init)
    }

    get totalPrice() {
        return this.product.price * this.quantity
    }
}