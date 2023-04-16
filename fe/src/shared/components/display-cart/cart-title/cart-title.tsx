import { Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { shoppingActions } from "../../../../shopping/store/actions"
import { getShoppingCart } from "../../../../shopping/store/selectors";
import classes from './cart-title.module.scss';

const CartTitle: React.FC = () => {
  const cartFromStore = useSelector(getShoppingCart);
  const dispatch = useDispatch();

  const clearCart = () => {
    dispatch(shoppingActions.clearShoppingCart())
  }

  return (
    <div className={classes.component}>
        <h1>Bevásárló kosár</h1>
        <h3>{cartFromStore.itemCount} db tétel van a kosárban 
        {
          !cartFromStore.isEmpty && <Button variant='contained' color='warning' onClick={clearCart}>
            Kosár ürítés
          </Button>
        }
        </h3>
    </div>
  )
}

export default CartTitle