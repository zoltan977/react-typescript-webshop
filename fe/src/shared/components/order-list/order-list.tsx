import { ArrowDownward, Clear, Search } from '@mui/icons-material';
import MaterialTable from 'material-table';
import { forwardRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { OrderDataFromAPI } from '../../models/order.model';
import { getAll, getAllByUser } from '../../services/order.service';
import { useIsAdminRoute } from '../../hooks/useIsAdminRoute';
import globalErrorHandler from '../../utils/globalErrorHandler';
import classes from './order-list.module.scss';

const tableIcons: any = {
    ResetSearch: forwardRef((props: any, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props: any, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props: any, ref) => <ArrowDownward {...props} ref={ref} />),
  };

const OrderList = () => {
    const [orders, setOrders] = useState<OrderDataFromAPI[]>([]);
    const isAdminRoute = useIsAdminRoute();

    const populateOrders = async () => {
        try {
            const orders = isAdminRoute ? await getAll() : await getAllByUser();
            setOrders(orders as OrderDataFromAPI[]);
        } catch (error) {
            globalErrorHandler(error)            
        }
    }

    useEffect(() => {
        populateOrders()
    }, [isAdminRoute])
    
    return (
        <div className={classes.component}>
        <MaterialTable
            icons={tableIcons}
            columns={[
                { title: 'Email', field: 'userEmail' },
                { title: 'Név', field: 'name' },
                { title: 'Dátum', 
                  field: 'dateCreated', 
                  customFilterAndSearch: (term, rowData) => new Date(rowData.dateCreated).toLocaleString('hu-HU', {timeStyle: 'short', dateStyle: 'short'}).includes(term),
                  render: rowData => new Date(rowData.dateCreated).toLocaleString('hu-HU', {timeStyle: 'short', dateStyle: 'short'})
                },
                { title: '', 
                  field: '_id',
                  searchable: false,
                  filtering: false,
                  render: rowData => <Link to={`order-details/${rowData._id}`}>Megnézem</Link>
                },
            ]}
            data={orders}
            options={{
                paging: false,
                showTitle: false
            }}
        />
        </div>
    )
}

export default OrderList