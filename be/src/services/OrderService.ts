import { AddOrderRequestInterface } from "../DTO/AddOrderRequest";
import { UpdateOrderStatusRequest } from "../DTO/UpdateOrderStatusRequest";
import { DatabaseException } from "../exceptions/DatabaseException";
import OrderModel from "../models/order/order";

class OrderService {
  public async add(orderData: AddOrderRequestInterface) {
      console.log("orderData:", orderData)

      let savedOrder
      try {
        const newOrder = new OrderModel({...orderData, dateCreated: new Date().getTime()});
        savedOrder = await newOrder.save();
    
      } catch (error) {
        console.log("Error creating Order: ", error);
        throw new DatabaseException();
      }
      
      return savedOrder;
  }

  public async update(newStatusRequest: UpdateOrderStatusRequest) {
    console.log("newStatusRequest:", newStatusRequest)

    let savedOrder
    try {
      const order = await OrderModel.findById(newStatusRequest._id);
      order!.orderStatus = newStatusRequest.newStatus;
      savedOrder = await order!.save();
    } catch (error) {
      console.log("Error updating Order: ", error);
      throw new DatabaseException();
    }
    
    return savedOrder;
  }

  public async getAll() {
    let orders

    try {
      orders = OrderModel.find()
    } catch (error) {
      throw new DatabaseException();
    }

    return orders;
  }

  public async getAllByUser(userEmail: string) {
    let orders

    try {
      orders = OrderModel.find({userEmail})
    } catch (error) {
      throw new DatabaseException();
    }

    return orders;
  }

  public async get(orderId: string) {
    let order

    try {
      order = OrderModel.findById(orderId)
    } catch (error) {
      throw new DatabaseException();
    }

    return order;
  }

  public async delete(orderId: string) {
    try {
      await OrderModel.findByIdAndRemove(orderId);
    } catch (error) {
      throw new DatabaseException()
    }

    return true;
  }
}

export default OrderService;