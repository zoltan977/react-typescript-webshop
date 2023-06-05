import { CardHeader } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { shoppingActions } from '../../../shopping/store/actions';
import { getShoppingCart } from '../../../shopping/store/selectors';
import { Product } from '../../models/product.model';
import ProductQuantity from '../product-quantity/product-quantity';

interface ProductCardProps {
  product: Product;
  withoutActions?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({product, withoutActions}) => {
  const dispatch = useDispatch()
  const shoppingCart = useSelector(getShoppingCart)

  const addToCart = () => {
    dispatch(shoppingActions.addToShoppingCart(product, 1))
  }
  
  return (
    <Card sx={{ width: 400 }}>
      <CardHeader sx={{textAlign: 'center'}}
        title={product.title}
      />
      <CardMedia
        id={product._id}
        sx={{ height: 400, backgroundSize: 'contain' }}
        image={product.imageURL || "/static/noimage.jpg"}
        title={product.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{textAlign: 'center'}}>
          {product.price.toLocaleString('hu-HU', {currency: 'HUF', style: 'currency', maximumFractionDigits: 0})}
        </Typography>
      </CardContent>
      {
        !withoutActions && <CardActions>
          {
            !shoppingCart.getProductQuantity(product) ?
              <Button sx={{ width: '100%'}} variant='contained' onClick={addToCart}>Add to cart</Button>
              :
              <ProductQuantity product={product} />
          }
        </CardActions>
      }
    </Card>
  );
}

export default ProductCard;