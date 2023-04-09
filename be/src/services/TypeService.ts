import { DatabaseException } from "../exceptions/DatabaseException";
import CategoryModel from "../models/category/category";

class TypeService {
  public async getCategoryList() {
      try {
        return CategoryModel.find();
      } catch (error) {
        console.log("Error getting categories: ", error);
        throw new DatabaseException();
      }
  }
}
export default TypeService;