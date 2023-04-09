import { OrderStatusType } from '../constants/enum/OrderStatusType';
import OrderModel from '../models/order/order';
import { IsIn, IsString } from '../utils/classValidatorWithErrorMessage';
import { IsIdValid } from '../utils/validationDecorator/isIdValid';

export interface UpdateOrderStatusRequestInterface {
    _id: string;
    newStatus: OrderStatusType;
}

export class UpdateOrderStatusRequest implements UpdateOrderStatusRequestInterface {
    @IsString()
    @IsIdValid(OrderModel)
    public _id!: string;
    
    @IsIn([
        OrderStatusType.NEW, 
        OrderStatusType.PICKING, 
        OrderStatusType.PACKED, 
        OrderStatusType.COMPLETED, 
        OrderStatusType.RETURNED, 
        OrderStatusType.CANCELLED
    ])
    public newStatus!: OrderStatusType.NEW | 
    OrderStatusType.PICKING | OrderStatusType.PACKED | 
    OrderStatusType.COMPLETED | OrderStatusType.RETURNED | OrderStatusType.CANCELLED;
}
