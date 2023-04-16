import 'reflect-metadata';

import { Type } from 'class-transformer';
import { IsArray, ValidateNested, ArrayNotEmpty } from 'class-validator';

import { Product } from './product.model';
import { ShoppingCartItem } from './shopping-cart-item';
import { IsNotEmpty } from '../utils/classValidatorWithErrorMessage';

export class ShoppingCart {
    @IsNotEmpty()
    public readonly _id: string = "";

    @ValidateNested({ each: true })
    @IsArray()
    @ArrayNotEmpty()
    @Type(() => ShoppingCartItem)
    public readonly items: ShoppingCartItem[] = [];
    
    constructor(init?: ShoppingCart) {
        if (init) {
            this._id = init._id;
    
            for (const item of init.items) {
                this.items.push(new ShoppingCartItem(item))
            }
        }
    }

    get totalPrice(): number {
        let totalPrice: number = 0;
        for (const item of this.items) {
            totalPrice += item.totalPrice
        }

        return totalPrice;
    }

    get itemCount(): number {
        let count: number = 0;
        for (const item of this.items) {
            count += item.quantity
        }

        return count;
    }

    get isEmpty(): boolean {
        return !this.items.length;
    }

    getProductQuantity(product: Product) {
        const item = this.items.find((item: ShoppingCartItem) => item.product._id === product._id)
        return item ? item.quantity : 0
    }
}