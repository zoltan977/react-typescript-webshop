import { IsString } from "../utils/classValidatorWithErrorMessage";

interface DeliveryAddressDTOInterface {
    address: string;
    city: string;
}

export class DeliveryAddressDTO implements DeliveryAddressDTOInterface {
    
    @IsString()
    public address!: string;

    @IsString()
    public city!: string;
}
