import { useEffect, useMemo, useState } from 'react';

import LoadingMask from '../../../shared/components/loadingMask/loadingMask.component';
import ProductCard from '../../../shared/components/product-card/productCard';
import { useCurrentSearchParam } from '../../../shared/hooks/useCurrentSearchParam';
import { Product } from '../../../shared/models/product.model';
import { getAll as getAllProduct } from '../../../shared/services/product.service';
import globalErrorHandler from '../../../shared/utils/globalErrorHandler';
import Categories from './categories/categories';
import classes from './products.module.scss';

const Products: React.FC = () => {
  const category = useCurrentSearchParam("category");

  const [products, setProducts] = useState<Product[]>([])
  const filteredProducts = useMemo<Product[]>(() => products.filter(p => !category || p.category === category), [category, products])

  const [isDataLoading, setIsDataLoading] = useState(false)


  const populateProducts = async () => {
    try {
      setIsDataLoading(true)
      const products = await getAllProduct() as Product[];
      setIsDataLoading(false)
      console.log("products: ", products);
      setProducts(products)
    } catch (error) {
      globalErrorHandler(error)      
    }
  }

  useEffect(() => {
    populateProducts()
  }, [])
  
  return isDataLoading ? <LoadingMask/> : <div className={classes.component}>
        <div className={classes.categories}>
          <Categories category={category}/>
        </div>
        <div className={classes.products}>
          {filteredProducts.map((p, i) => <ProductCard key={i} product={p} />)}
        </div>
      </div>
}
export default Products