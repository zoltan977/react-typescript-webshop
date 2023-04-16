import { apiEndpoints } from "../../shared/constants/apiEndpoints";
import { CART_ID_KEY } from "../../shared/constants/storageItems";
import { AppError } from "../../shared/errors/appError";
import { Product } from "../../shared/models/product.model";
import { ShoppingCart } from "../../shared/models/shopping-cart";
import httpClient from "../../shared/utils/httpClient";
import serviceErrorHandler from "../../shared/utils/serviceErrorHandler";

const path = apiEndpoints.cart;

const emptyShoppingCartPromise = Promise.resolve(new ShoppingCart());
const newShoppingCartPromise = (data: ShoppingCart) => Promise.resolve(new ShoppingCart(data))

export const addToCart = async (product: Product): Promise<ShoppingCart | AppError> => {
    console.log("service addToCart product, quantity: ", product)
    const cartId = getCartId()
    return httpClient.post<ShoppingCart>(`${path}/add`, {product, cartId}).then(response => {
        setCartId(response.data._id)
        return newShoppingCartPromise(response.data)
    }).catch(serviceErrorHandler);
};

export const removeFromCart = async (product: Product): Promise<ShoppingCart | AppError> => {
    console.log("service removeFromCart product, quantity: ", product)
    const cartId = getCartId()
    return httpClient.post<ShoppingCart>(`${path}/remove`, {product, cartId}).then(response => newShoppingCartPromise(response.data)).catch(serviceErrorHandler);
};

export const getCart = async (): Promise<ShoppingCart | AppError> => {
    const cartId = getCartId()
    console.log("service getCart cartId: ", cartId)

    if (!cartId) {
      return emptyShoppingCartPromise;
    }
    return httpClient.get<ShoppingCart>(`${path}/get/${cartId}`).then(response => newShoppingCartPromise(response.data)).catch(serviceErrorHandler);
};

export const clearCart = async (): Promise<ShoppingCart | AppError> => {
    const cartId = getCartId()
    if (!cartId) {
      return emptyShoppingCartPromise;
    }
    return httpClient.delete<boolean>(`${path}/clear/${cartId}`).then(response => {
        removeCartId()
        return emptyShoppingCartPromise;
    }).catch(serviceErrorHandler);
};

const setCartId = (cartId: string) => {
    return localStorage.setItem(CART_ID_KEY, cartId)
  }

const getCartId = () => {
    return localStorage.getItem(CART_ID_KEY)
}

const removeCartId = () => {
    return localStorage.removeItem(CART_ID_KEY)
}

