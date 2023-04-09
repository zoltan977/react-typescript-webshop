import { Type } from "class-transformer";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { CartModelInterface } from "../models/cart/cart";
import { CartItemDTO } from "./CartItemDTO";

export interface CartModelWithoutDateInterface extends Omit<CartModelInterface, "dateCreated"> {
}

export class CartDTO implements CartModelWithoutDateInterface {

    @IsDefined()
    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => CartItemDTO)
    public items!: CartItemDTO[];
}
