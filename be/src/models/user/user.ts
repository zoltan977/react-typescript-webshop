import {Schema, model, Document} from 'mongoose';

export interface UserModelInterface {
    username: string;
    password: string;
    email: string;
    photo?: string;
    admin?: boolean;
}

const UserSchema = new Schema<UserModelInterface>({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      default: "no-image.png",
    },
    admin: {
      type: Boolean,
      default: false
    }
  });
  
 const UserModel = model<Document & UserModelInterface>("user", UserSchema);

 export default UserModel;
  