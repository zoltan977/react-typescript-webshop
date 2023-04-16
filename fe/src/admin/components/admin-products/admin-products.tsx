import { ArrowDownward, Clear, Search } from '@mui/icons-material';
import { Button } from '@mui/material';
import MaterialTable from 'material-table';
import { forwardRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../shared/constants/routes';
import { Product } from '../../../shared/models/product.model';
import globalErrorHandler from '../../../shared/utils/globalErrorHandler';
import { getAll as getAllProduct } from '../../../shared/services/product.service';

import classes from './admin-products.module.scss';

const tableIcons: any = {
    ResetSearch: forwardRef((props: any, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props: any, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props: any, ref) => <ArrowDownward {...props} ref={ref} />),
  };

const AdminProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const populateProducts = async () => {
        try {
            const products = await getAllProduct();
            setProducts(products as Product[]);
        } catch (error) {
            globalErrorHandler(error)            
        }
    }

    useEffect(() => {
        populateProducts()
    }, [])
    
    return (
        <div className={classes.component}>
            <Button 
                variant='contained'
                component={Link}
                to={routes.adminProductNew}
                type='button'>
                Új termék
            </Button>
            <MaterialTable
                icons={tableIcons}
                columns={[
                    { title: 'Termék', field: 'title' },
                    { title: 'Ár', 
                    field: 'price', 
                    render: rowData => rowData.price.toLocaleString('hu-HU', {currency: 'HUF', style: 'currency', maximumFractionDigits: 0})
                    },
                    { title: '', 
                    field: '_id',
                    searchable: false,
                    filtering: false,
                    render: rowData => <Link to={`product-details/${rowData._id}`}>Szerkesztés</Link>
                    },
                ]}
                data={products}
                options={{
                    paging: false,
                    showTitle: false
                }}
            />
        </div>
    )
}

export default AdminProducts