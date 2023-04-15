import { IsInt, IsNotEmpty, IsPositive, IsUrl } from '../utils/classValidatorWithErrorMessage';
export class Product {
    constructor(init?: Product) {
        if (init) {
            Object.assign(this, init);
        }
    }

    public readonly _id?: string;

    @IsNotEmpty()
    public readonly title: string = "";

    @IsInt()
    @IsPositive()
    public readonly price: number = 0;

    @IsNotEmpty()
    public readonly category: string = "";

    @IsUrl()
    public readonly imageURL: string = "";
}