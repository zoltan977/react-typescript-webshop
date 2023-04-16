import { Product } from '../../shared/models/product.model';
import { ShoppingCart } from '../../shared/models/shopping-cart';
import { AddToShoppingCartActionInterface, ClearShoppingCartActionInterface, GetShoppingCartActionInterface, RemoveFromShoppingCartActionInterface, SetShoppingCartActionInterface, ShoppingActionTypes } from './types';

const setShoppingCart = (cart: ShoppingCart): SetShoppingCartActionInterface => ({
    cart,
    type: ShoppingActionTypes.SET_SHOPPING_CART
});

const addToShoppingCart = (product: Product, quantity: number): AddToShoppingCartActionInterface => ({
    product,
    type: ShoppingActionTypes.ADD_TO_SHOPPING_CART
});

const removeFromShoppingCart = (product: Product, quantity: number): RemoveFromShoppingCartActionInterface => ({
    product,
    type: ShoppingActionTypes.REMOVE_FROM_SHOPPING_CART
});

const getShoppingCart = (): GetShoppingCartActionInterface => ({
    type: ShoppingActionTypes.GET_SHOPPING_CART
});

const clearShoppingCart = (): ClearShoppingCartActionInterface => ({
    type: ShoppingActionTypes.CLEAR_SHOPPING_CART
});


export const shoppingActions = {
    setShoppingCart,
    getShoppingCart,
    clearShoppingCart,
    addToShoppingCart,
    removeFromShoppingCart
};
