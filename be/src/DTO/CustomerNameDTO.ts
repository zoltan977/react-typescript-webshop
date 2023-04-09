import { IsString } from "../utils/classValidatorWithErrorMessage";

interface CustomerNameDTOInterface {
    name: string;
}

export class CustomerNameDTO implements CustomerNameDTOInterface {
    
    @IsString()
    public name!: string;
}
