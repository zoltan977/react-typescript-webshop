import {Schema, model, Document} from 'mongoose';

export interface ProductModelInterface {
    _id: string;
    title: string;
    price: number;
    category: string;
    imageURL: string;
}

export const ProductSchema = (titleIsUnique = true) => new Schema<ProductModelInterface>({
    title: {
      type: String,
      required: true,
      unique: titleIsUnique
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    imageURL: {
      type: String,
      required: true
    }
  });
  
 const ProductModel = model<Document & ProductModelInterface>("product", ProductSchema());

 export default ProductModel;
  