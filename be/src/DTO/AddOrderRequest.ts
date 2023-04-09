import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';

import { DeliveryMethodType } from '../constants/enum/DeliveryMethodType';
import { PaymentMethodType } from '../constants/enum/PaymentMethodType';
import { OrderModelInterface } from '../models/order/order';
import { IsEmail, IsIn, IsString } from '../utils/classValidatorWithErrorMessage';
import { IsUserEmailInUserCollection } from '../utils/validationDecorator/isUserEmailInUserCollection';
import { CartDTO } from './CartDTO';

export interface AddOrderRequestInterface extends Omit<OrderModelInterface, "dateCreated" | "orderStatus" | "_id"> {
}

export class AddOrderRequest implements AddOrderRequestInterface {
    @IsString()
    public name!: string;

    @IsString()
    public address!: string;

    @IsString()
    public city!: string;

    @IsDefined()
    @ValidateNested()
    @Type(() => CartDTO)
    public cart!: CartDTO;

    @IsEmail()
    @IsUserEmailInUserCollection()
    public userEmail!: string;

    @IsIn([DeliveryMethodType.CLICK_AND_COLLECT, DeliveryMethodType.HOME_DELIVERY, DeliveryMethodType.LOCKER_DELIVERY])
    public deliveryMethod!: DeliveryMethodType.CLICK_AND_COLLECT | DeliveryMethodType.HOME_DELIVERY | DeliveryMethodType.LOCKER_DELIVERY;

    @IsIn([PaymentMethodType.BANK_TRANSFER, PaymentMethodType.CASH, PaymentMethodType.CREDIT_CARD])
    public paymentMethod!: PaymentMethodType.BANK_TRANSFER | PaymentMethodType.CASH | PaymentMethodType.CREDIT_CARD;
}
