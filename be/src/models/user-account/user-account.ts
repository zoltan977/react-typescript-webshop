import {Schema, model, Document} from 'mongoose';

export interface UserAccountModelInterface {
    _id: string;
    userEmail: string;
    customerNames: CustomerNameInterface[];
    deliveryAddresses: DeliveryAddressInterface[];
}

interface CustomerNameInterface {
    _id: string;
    name: string;
}

interface DeliveryAddressInterface {
    _id: string;
    address: string;
    city: string;
}

const CustomerNamesSchema = new Schema<CustomerNameInterface>({
    name: {
        type: String,
        required: true
    },
});

const DeliveryAddressesSchema = new Schema<DeliveryAddressInterface>({
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
});

const UserAccountSchema = new Schema<UserAccountModelInterface>({
    customerNames: {
      type: [CustomerNamesSchema],
      required: true
    },
    deliveryAddresses: {
        type: [DeliveryAddressesSchema],
        required: true
      },
    userEmail: {
      type: String,
      required: true,
      unique: true
    },
});
  
 const UserAccountModel = model<Document & UserAccountModelInterface>("userAccount", UserAccountSchema);

 export default UserAccountModel;
  