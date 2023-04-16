import { MenuItem, TextField } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { OrderDataFromAPI, OrderStatusList } from '../../../../models/order.model';
import { update as updateOrder } from '../../../../services/order.service';
import useConfirm from '../../../../hooks/useConfirm';
import { useIsAdminRoute } from '../../../../hooks/useIsAdminRoute';
import globalErrorHandler from '../../../../utils/globalErrorHandler';
import classes from './order-data.module.scss';

interface  OrderDataProps {
  order: OrderDataFromAPI;
}

const OrderData: FC<OrderDataProps> = ({order}) => {
  const isAdminRoute = useIsAdminRoute();
  const [currentOrder, setCurrentOrder] = useState<OrderDataFromAPI>(new OrderDataFromAPI());
  const [Dialog, confirmUpdate, changeCurrentMessage]: [React.FC, () => Promise<boolean>, (newMessage: string) => void] = useConfirm(
    'Figyelem!',
    'Biztos hogy módosítod a megrendelést?',
  );

  const orderStatusChange = async (event: any) => {
    const newValue = new OrderDataFromAPI({...currentOrder, orderStatus: event.target.value} as OrderDataFromAPI);
    changeCurrentMessage(`Biztos hogy módosítod a megrendelés státuszát erre: ${newValue.orderStatusDisplayName}?`);
    
    const response: boolean = await confirmUpdate()
    if (response) {
      setCurrentOrder(newValue);

      try {
        await updateOrder({_id: currentOrder._id, newStatus: event.target.value});
        toast.success("A módosítás sikeres!")
      } catch (error) {
        globalErrorHandler(error)        
      }
    }
  };

  useEffect(() => {
    setCurrentOrder(new OrderDataFromAPI(order))
  }, [order])
  
  return (
    <div className={classes.component}>
      <p>
        <span>Név:</span>
        <span>
            {currentOrder.name}
        </span>
      </p>
      <p>
        <span>
          Cím:
        </span>
        <span>
          {currentOrder.address}
        </span>
      </p>
      <p>
        <span>Város:</span>
        <span>
          {currentOrder.city}
        </span>
      </p>
      <p>
        <span>Kiszállítási mód:</span>
        <span>
          {currentOrder.deliveryMethodDisplayName}
        </span>
      </p>
      <p>
        <span>Fizetési mód:</span>
        <span>
          {currentOrder.paymentMethodDisplayName}
        </span>
      </p>
      <div>
        <span>Rendelés státusza:</span>
        {
          isAdminRoute ? <span>
            <TextField
              sx={{width: 200}}
              variant='filled'
              value={currentOrder.orderStatus}
              label="Rendelés Státusza"
              onChange={orderStatusChange}
              select
            >
              {
                OrderStatusList.map((os, i) => <MenuItem key={i} value={os.value}>{os.displayValue}</MenuItem>)
              }
            </TextField>
          </span>
          : <span>
              {currentOrder.orderStatusDisplayName}
          </span>
        }
      </div>
      <p>
        <span>Dátum:</span>
        <span>
          {currentOrder.dateCreated.toLocaleString('hu-HU', {timeStyle: 'short', dateStyle: 'short'})}
        </span>
      </p>
      <Dialog />
    </div>
  )
}

export default OrderData