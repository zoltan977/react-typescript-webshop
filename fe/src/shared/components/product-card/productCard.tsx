import { CardHeader } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { Product } from '../../models/product.model';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  
  return (
    <Card sx={{ width: 400 }}>
      <CardHeader sx={{textAlign: 'center'}}
        title={product.title}
      />
      <CardMedia
        sx={{ height: 400, backgroundSize: 'contain' }}
        image={product.imageURL || "/static/noimage.jpg"}
        title={product.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{textAlign: 'center'}}>
          {product.price.toLocaleString('hu-HU', {currency: 'HUF', style: 'currency', maximumFractionDigits: 0})}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductCard;