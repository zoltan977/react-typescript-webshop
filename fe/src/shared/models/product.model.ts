export class Product {
    constructor(init?: Product) {
        if (init) {
            Object.assign(this, init);
        }
    }

    public readonly _id?: string;

    public readonly title: string = "";

    public readonly price: number = 0;

    public readonly category: string = "";

    public readonly imageURL: string = "";
}