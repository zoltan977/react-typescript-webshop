import {Schema, model, Document} from 'mongoose';
import { DeliveryMethodType } from '../../constants/enum/DeliveryMethodType';
import { OrderStatusType } from '../../constants/enum/OrderStatusType';
import { PaymentMethodType } from '../../constants/enum/PaymentMethodType';
import { CartModelWithoutDateInterface } from '../../DTO/CartDTO';
import { ItemSchema } from '../cart/cart';

export interface OrderModelInterface {
    _id: string;
    name: string;
    address: string;
    city: string;
    cart: CartModelWithoutDateInterface;
    userEmail: string;
    deliveryMethod: DeliveryMethodType;
    paymentMethod: PaymentMethodType;
    orderStatus: OrderStatusType;
    dateCreated: Date;
}

const CartSchemaWithoutDate = new Schema<CartModelWithoutDateInterface>({
  items: [ItemSchema],
});

export const OrderSchema = new Schema<OrderModelInterface>({
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    cart: {
      type: CartSchemaWithoutDate,
      required: true
    },
    userEmail: {
      type: String,
      required: true
    },
    deliveryMethod: {
      type: String,
      enum: Object.values(DeliveryMethodType),
      required: true
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethodType),
      required: true
    },
    orderStatus: {
      type: String,
      enum: Object.values(OrderStatusType),
      default: OrderStatusType.NEW
    },
    dateCreated: {
      type: Date,
      required: true
    }
  });
  
 const OrderModel = model<Document & OrderModelInterface>("order", OrderSchema);

 export default OrderModel;
  