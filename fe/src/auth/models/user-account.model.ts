import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { IsNotEmpty, IsEmail } from '../../shared/utils/classValidatorWithErrorMessage';
import { Type } from "class-transformer";
import 'reflect-metadata';

export class CustomerName {
    public readonly _id?: string;

    @IsNotEmpty()
    public readonly name: string = "";
}

export class DeliveryAddress {
    public readonly _id?: string;

    @IsNotEmpty()
    public readonly address: string = "";

    @IsNotEmpty()
    public readonly city: string = "";
}

export class UserAccountData {

    public readonly _id?: string;

    @IsEmail()
    public readonly userEmail: string = "";

    @IsDefined()
    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => CustomerName)
    public readonly customerNames: CustomerName[] = [new CustomerName()];
 
    @IsDefined()
    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => DeliveryAddress)
    public readonly deliveryAddresses: DeliveryAddress[] = [new DeliveryAddress()];

    constructor (init?: UserAccountData) {
        if (init) {
            Object.assign(this, init)
        }
    }
}
