import { Type } from 'class-transformer';
import { IsArray, IsDefined, ValidateNested } from 'class-validator';

import { IsEmail } from '../utils/classValidatorWithErrorMessage';
import { CustomerNameDTO } from './CustomerNameDTO';
import { DeliveryAddressDTO } from './DeliveryAddressDTO';

interface AddUserAccountItemsRequestInterface {
    customerNames: CustomerNameDTO[];
}

export class AddUserAccountItemsRequest implements AddUserAccountItemsRequestInterface {

    @IsDefined()
    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => CustomerNameDTO)
    public customerNames!: CustomerNameDTO[];

    @IsDefined()
    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => DeliveryAddressDTO)
    public deliveryAddresses!: DeliveryAddressDTO[];

    @IsEmail()
    userEmail!: string;
}
