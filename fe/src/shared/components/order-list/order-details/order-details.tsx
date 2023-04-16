import classes from './order-details.module.scss';
import {useParams} from 'react-router-dom';
import { OrderDataFromAPI } from '../../../models/order.model';
import { useEffect, useState } from 'react';
import { get, remove as removeOrder } from '../../../services/order.service';
import globalErrorHandler from '../../../utils/globalErrorHandler';
import OrderData from './order-data/order-data';
import DisplayCart from '../../display-cart/display-cart';
import { Button } from '@mui/material';
import { useIsAdminRoute } from '../../../hooks/useIsAdminRoute';
import { toast } from 'react-toastify';
import history from '../../../utils/history';
import { routes } from '../../../constants/routes';
import useConfirm from '../../../hooks/useConfirm';

const OrderDetails = () => {
    const {id} = useParams();
    const [order, setOrder] = useState<OrderDataFromAPI>(new OrderDataFromAPI());
    const isAdminRoute = useIsAdminRoute();
    const [Dialog, confirmDelete]: [React.FC, () => Promise<boolean>, (newMessage: string) => void] = useConfirm(
        'Figyelem!',
        'Biztos hogy törlöd a megrendelést?',
      )

    const deleteOrder = async () => {
        const response: boolean = await confirmDelete()
        if (response) {
            try {
                await removeOrder(id as string);
                toast.success("A törlés sikeres!");
                history.push(routes.adminOrders);
            } catch (error) {
                globalErrorHandler(error)
            }
        }
    }

    const populateOrder = async () => {
        if (!id ) {
            return;
        }

        try {
            const order = await get(id);
            setOrder(new OrderDataFromAPI(order as OrderDataFromAPI));
        } catch (error) {
            globalErrorHandler(error)            
        }
    }


    useEffect(() => {
        populateOrder()
    }, [id])

    
    return (
        <div className={classes.component}>
            <h1>
                A megrendelés részletei
                {
                    isAdminRoute && <Button type="button" variant='contained' color='warning' onClick={deleteOrder}>
                        Rendelés törlése
                    </Button>
                }
            </h1>
            <p>
                Összesen {order.cart.itemCount || 0} db termék. 
            </p>
            <div className={classes.content}>
                <OrderData order={order} />
                <DisplayCart orderCart={order.cart} />
            </div>
            <Dialog />
        </div>
    )
}

export default OrderDetails