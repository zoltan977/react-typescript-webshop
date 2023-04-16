import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import DisplayCart from '../../../shared/components/display-cart/display-cart';
import { routes } from '../../../shared/constants/routes';
import { getShoppingCart } from '../../store/selectors';
import classes from './shopping-cart.module.scss';

const ShoppingCart = () => {
  const shoppingCart = useSelector(getShoppingCart)
  
  return (
    <div className={classes.component}>
      <DisplayCart />
      {
        !shoppingCart.isEmpty && <Button 
          component={Link}
          to={routes.checkOut}
          color='secondary'
          type='button' 
          variant='contained' 
          sx={{margin: 1}}>
            Megrendelem
        </Button>
      }
    </div>
  )
}

export default ShoppingCart