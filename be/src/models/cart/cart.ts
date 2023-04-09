import {Schema, model, Document} from 'mongoose';
import { ProductModelInterface, ProductSchema } from '../product/product';

export interface CartModelInterface {
    items: ItemModelInterface[]
    dateCreated: Date;
}

export interface ItemModelInterface {
  product: ProductModelInterface,
  quantity: number
}

export const ItemSchema = new Schema<ItemModelInterface>({
  product: {
    type: ProductSchema(false),
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
})

const CartSchema = new Schema<CartModelInterface>({
    items: [ItemSchema],
    dateCreated: {
      type: Date,
      required: true
    }
  });
  
 const CartModel = model<Document & CartModelInterface>("cart", CartSchema);

 export default CartModel;
  