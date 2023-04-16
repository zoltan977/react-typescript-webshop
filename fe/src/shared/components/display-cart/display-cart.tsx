import { ArrowDownward } from "@mui/icons-material";
import { TableCell, TableFooter, TableRow } from "@mui/material";
import MaterialTable, { MTableBody } from "material-table";
import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { getShoppingCart } from "../../../shopping/store/selectors";
import { ShoppingCart } from "../../models/shopping-cart";
import ProductQuantity from "../product-quantity/product-quantity";
import CartTitle from "./cart-title/cart-title";
import classes from './display-cart.module.scss';

const tableIcons: any = {
  SortArrow: forwardRef((props: any, ref) => <ArrowDownward {...props} ref={ref} />),
};

interface DisplayCartProps {
  orderCart?: ShoppingCart;
}

const DisplayCart: React.FC<DisplayCartProps> = ({orderCart}) => {
    const cartFromStore = useSelector(getShoppingCart);
    const cart = !!orderCart ? orderCart : cartFromStore;

    const toolBar = !!orderCart ? {
      Toolbar: () => null
    } : {}

    return (<div className={classes.component}>
      <MaterialTable
          title={!orderCart ? <CartTitle /> : ""}
          icons={tableIcons}
          columns={[
              { title: '', 
                field: 'product.imageURL',
                render: rowData => <img alt={rowData.product.title} src={rowData.product.imageURL} style={{width: 100, borderRadius: '50%'}}/> 
              },
              { title: 'Termék', field: 'product.title' },
              { title: 'Mennyiség', 
                field: 'quantity' ,
                render: rowData => <ProductQuantity small product={rowData.product} orderCart={orderCart} />
              },
              { title: 'Ár', 
                field: 'totalPrice', 
                type: 'numeric',
                render: rowData => rowData.totalPrice.toLocaleString('hu-HU', {currency: 'HUF', style: 'currency', maximumFractionDigits: 0})
              },
          ]}
          data={cart.items}
          components={{
            Body: (props) => (
              <>
                <MTableBody {...props}/>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <span>Összesen:</span>{cart.totalPrice.toLocaleString('hu-HU', {currency: 'HUF', style: 'currency', maximumFractionDigits: 0})}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </>
            ),
            ...toolBar
          }}
          options={{
              search: false,
              paging: false,
          }}
      />
    </div>
      );
}

export default DisplayCart