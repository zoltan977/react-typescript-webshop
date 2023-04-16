import { ShoppingCart } from "./shopping-cart";
import { IsDefined, ValidateNested } from "class-validator";
import { IsNotEmpty, IsIn, IsEmail } from '../utils/classValidatorWithErrorMessage';
import { Type } from "class-transformer";
import 'reflect-metadata';

interface DropDownListItemInterface {
    value: string;
    displayValue: string;
}

export const OrderStatusList: DropDownListItemInterface[] = [
    {
        value: 'NEW',
        displayValue: 'Új, feldolgozás alatt'
    }, 
    {
        value: 'PICKING',
        displayValue: 'Összekészítés alatt'
    }, 
    {
        value: 'PACKED',
        displayValue: 'Összekészítve'
    },
    {
        value: 'COMPLETED',
        displayValue: 'Teljesítve'
    }, 
    {
        value: 'RETURNED',
        displayValue: 'Visszaküldve'
    }, 
    {
        value: 'CANCELLED',
        displayValue: 'Törölve'
    }, 
];

export const DeliveryMethods: DropDownListItemInterface[] = [{
    value: 'CLICK_AND_COLLECT',
    displayValue: 'Személyes átvétel'
}, {
    value: 'HOME_DELIVERY',
    displayValue: 'Házhoz szállítás'
}, {
    value: 'LOCKER_DELIVERY',
    displayValue: 'Csomagpontra szállítás'
}];

export const PaymentMethods: DropDownListItemInterface[] = [{
    value: 'CASH',
    displayValue: 'Készpénz'
}, {
    value: 'CREDIT_CARD',
    displayValue: 'Hitelkártya'
}, {
    value: 'BANK_TRANSFER',
    displayValue: 'Átutalás'
}]

class OrderCart {

    constructor(init?: OrderCart) {
        if (init) {
            this.cart = new ShoppingCart(init.cart)
        }
    }

    @IsDefined()
    @ValidateNested()
    @Type(() => ShoppingCart)
    public readonly cart: ShoppingCart = new ShoppingCart();
}

class CustomerData extends OrderCart {
    constructor(init?: CustomerData) {
        super(init)
        if (init) {
            this.name = init.name;
            this.address = init.address;
            this.city = init.city;
            this.userEmail = init.userEmail;
        }
    }

    @IsNotEmpty()
    public readonly name: string = "";

    @IsNotEmpty()
    public readonly address: string = "";

    @IsNotEmpty()
    public readonly city: string = "";

    @IsEmail()
    public readonly userEmail: string = "";
}
export class OrderFormModel extends CustomerData {

    @IsIn(DeliveryMethods.map(dm => dm.value))
    public readonly deliveryMethod: string = "";

    @IsIn(PaymentMethods.map(pm => pm.value))
    public readonly paymentMethod: string = "";
    
    constructor(init?: OrderFormModel) {
        super(init);
        
        if (init) {
            this.deliveryMethod = init.deliveryMethod;
            this.paymentMethod = init.paymentMethod;
        }
    }
    
    get deliveryMethodDisplayName(): string {
        return DeliveryMethods.find(dm => dm.value === this.deliveryMethod)?.displayValue || "";
    }
    get paymentMethodDisplayName(): string {
        return PaymentMethods.find(pm => pm.value === this.paymentMethod)?.displayValue || "";
    }
}

export class OrderDataFromAPI extends OrderFormModel {
    public readonly dateCreated: Date = new Date();
    public readonly orderStatus: string = "";
    public readonly _id: string = "";

    constructor(init?: OrderDataFromAPI) {
        super(init);
        if (init) {
            this.dateCreated = new Date(init.dateCreated);
            this.orderStatus = init.orderStatus;
            this._id = init._id;
        }    
    }

    get orderStatusDisplayName(): string {
        return OrderStatusList.find(os => os.value === this.orderStatus)?.displayValue || "";
    }
}
