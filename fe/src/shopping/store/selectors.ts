import { ShoppingCart } from '../../shared/models/shopping-cart';
import { GlobalStateInterface } from '../../store/GlobalStateInterface';

export const getShoppingCart = (state: GlobalStateInterface): ShoppingCart => state.shopping.cart;

