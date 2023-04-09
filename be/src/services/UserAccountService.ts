import { DatabaseException } from "../exceptions/DatabaseException";
import UserAccountModel, { UserAccountModelInterface } from "../models/user-account/user-account";

class UserAccountService {
  public async add(userAccountData: UserAccountModelInterface) {
      console.log("userAccountData:", userAccountData)

      const customerNames = userAccountData.customerNames;
      const deliveryAddresses = userAccountData.deliveryAddresses;
      const userEmail = userAccountData.userEmail;

      let savedAccount
      try {
        const userAccount = await UserAccountModel.findOne({userEmail});
        if (!userAccount) {
          const newAccount = new UserAccountModel({
            userEmail,
            customerNames,
            deliveryAddresses
          })

          savedAccount = await newAccount.save();
        } else {
          userAccount.deliveryAddresses.push(...deliveryAddresses);
          userAccount.customerNames.push(...customerNames);
          
          savedAccount = await userAccount.save();
        }

    
      } catch (error) {
        console.log("Error updating userAccount: ", error);
        throw new DatabaseException();
      }
      
      return savedAccount;
  }

  public async getByUser(userEmail: string) {
    let accountData

    try {
      accountData = await UserAccountModel.findOne({userEmail})
    } catch (error) {
      throw new DatabaseException();
    }

    return accountData;
  }  

  public async deleteDeliveryAddress(userEmail: string, deliveryAddressId: string) {
    let accountData

    try {
      accountData = await UserAccountModel.findOne({userEmail});
      accountData!.deliveryAddresses = accountData!.deliveryAddresses.filter(da => da._id.toString() !== deliveryAddressId)
      accountData = accountData!.save();
    } catch (error) {
      throw new DatabaseException();
    }

    return accountData;
  }  

  public async deleteCustomerName(userEmail: string, customerNameId: string) {
    let accountData

    try {
      accountData = await UserAccountModel.findOne({userEmail});
      accountData!.customerNames = accountData!.customerNames.filter(cn => cn._id.toString() !== customerNameId)
      accountData = accountData!.save();
    } catch (error) {
      throw new DatabaseException();
    }

    return accountData;
  }  
}

export default UserAccountService;