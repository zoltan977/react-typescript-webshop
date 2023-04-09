import {Schema, model, Document} from 'mongoose';

export interface CategoryModelInterface {
    name: string;
    displayName: string;
}

const CategorySchema = new Schema<CategoryModelInterface>({
    name: {
      type: String,
      required: true,
      unique: true
    },
    displayName: {
      type: String,
      required: true
    }
  });
  
 const CategoryModel = model<Document & CategoryModelInterface>("category", CategorySchema);

 export default CategoryModel;
  