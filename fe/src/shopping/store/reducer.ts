import { Actions, ShoppingActionTypes } from './types';
import { ShoppingStateInterface } from './shoppingStateInterface';
import { ShoppingCart } from '../../shared/models/shopping-cart';

const initState: ShoppingStateInterface = {
    cart: new ShoppingCart(),
};


const shoppingReducer = (state = initState, action: Actions): ShoppingStateInterface => {
    switch (action.type) {
        case ShoppingActionTypes.SET_SHOPPING_CART:
            return {
                ...state,
                cart: new ShoppingCart(action.cart),
            };
        default:
            return state;
    }
};

export default shoppingReducer;
