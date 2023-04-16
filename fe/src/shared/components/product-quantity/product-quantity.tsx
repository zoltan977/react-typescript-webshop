import { Button } from '@mui/material';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { shoppingActions } from '../../../shopping/store/actions';
import { getShoppingCart } from '../../../shopping/store/selectors';
import { Product } from '../../models/product.model';
import { ShoppingCart } from '../../models/shopping-cart';
import classes from './product-quantity.module.scss';

interface ProductQuantityProps {
  product: Product;
  orderCart?: ShoppingCart;
  small?: boolean;
}

const ProductQuantity: React.FC<ProductQuantityProps> = ({product, small, orderCart}) => {
    const cartFromStore = useSelector(getShoppingCart);
    const cart = orderCart ? orderCart : cartFromStore;
    const dispatch = useDispatch()

    const decreaseProductQuantity = () => {
      dispatch(shoppingActions.removeFromShoppingCart(product, 1))
    }

    const increaseProductQuantity = () => {
      dispatch(shoppingActions.addToShoppingCart(product, 1))
    }

    const addSmallClassByTheProp = classnames(classes.component, {[classes.small]: small})

    return (
        <div className={addSmallClassByTheProp}>
          {!orderCart && <Button variant='contained' type='button' onClick={decreaseProductQuantity}>-</Button>}
          <p>{cart.getProductQuantity(product)} db {!orderCart && ' a kosárban'}</p>
          {!orderCart && <Button variant='contained' type='button' onClick={increaseProductQuantity}>+</Button>}
        </div>
      );
}

export default ProductQuantity