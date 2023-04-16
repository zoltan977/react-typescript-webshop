import { AuthStateInterface } from '../auth/store/authStateInterface';
import { ShoppingStateInterface } from '../shopping/store/shoppingStateInterface';

export interface GlobalStateInterface {
    shopping: ShoppingStateInterface;
    auth: AuthStateInterface;
}
