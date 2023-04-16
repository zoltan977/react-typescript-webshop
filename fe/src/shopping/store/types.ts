import { Product } from "../../shared/models/product.model";
import { ShoppingCart } from "../../shared/models/shopping-cart";

export enum ShoppingActionTypes {
    GET_SHOPPING_CART = 'SHOPPING/GET_SHOPPING_CART',
    CLEAR_SHOPPING_CART = 'SHOPPING/CLEAR_SHOPPING_CART',
    SET_SHOPPING_CART = 'SHOPPING/SET_SHOPPING_CART',
    ADD_TO_SHOPPING_CART = 'SHOPPING/ADD_TO_SHOPPING_CART',
    REMOVE_FROM_SHOPPING_CART = 'SHOPPING/REMOVE_FROM_SHOPPING_CART',
}

export interface GetShoppingCartActionInterface {
    type: ShoppingActionTypes.GET_SHOPPING_CART;
}

export interface ClearShoppingCartActionInterface {
    type: ShoppingActionTypes.CLEAR_SHOPPING_CART;
}
export interface SetShoppingCartActionInterface {
    type: ShoppingActionTypes.SET_SHOPPING_CART;
    cart: ShoppingCart;
}
export interface AddToShoppingCartActionInterface {
    type: ShoppingActionTypes.ADD_TO_SHOPPING_CART;
    product: Product;
}

export interface RemoveFromShoppingCartActionInterface {
    type: ShoppingActionTypes.REMOVE_FROM_SHOPPING_CART;
    product: Product;
}

export type Actions =
    | GetShoppingCartActionInterface
    | ClearShoppingCartActionInterface
    | SetShoppingCartActionInterface
    | AddToShoppingCartActionInterface
    | RemoveFromShoppingCartActionInterface
