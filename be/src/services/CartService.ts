import { AddCartItemRequestInterface } from "../DTO/AddCartItemRequest";
import { RemoveCartItemRequestInterface } from "../DTO/RemoveCartItemRequest";
import { DatabaseException } from "../exceptions/DatabaseException";
import CartModel from "../models/cart/cart";

class CartService {
  public async add(cartData: AddCartItemRequestInterface) {
      console.log("cartData:", cartData)

      let savedCart
      try {
        if (!cartData.cartId) {
          const newCart = new CartModel({
            dateCreated: new Date().getTime(),
            items: [{
              product: cartData.product,
              quantity: 1
            }]
          });
          savedCart = await newCart.save();
        } else {
          const cartToUpdate = await CartModel.findById(cartData.cartId);
          const itemToUpdate = cartToUpdate!.items.find(item => item.product._id.toString() === cartData.product._id.toString())
          if (itemToUpdate) {
            itemToUpdate.quantity += 1;
          } else {
            cartToUpdate!.items.push({
              product: cartData.product,
              quantity: 1
            })
          }

          savedCart = await cartToUpdate!.save()
        }
    
      } catch (error) {
        console.log("Error creating cart: ", error);
        throw new DatabaseException();
      }
      
      return savedCart;
  }

  public async remove(cartData: RemoveCartItemRequestInterface) {
    console.log("cartData:", cartData)
    
    let savedCart
    try {
        const cartToUpdate = await CartModel.findById(cartData.cartId);
        let itemToUpdate = cartToUpdate!.items.find(item => item.product._id.toString() === cartData.product._id.toString())
        
        itemToUpdate!.quantity -= 1;
        if (itemToUpdate!.quantity === 0) {
          cartToUpdate!.items = cartToUpdate!.items.filter(item => item.product._id.toString() !== cartData.product._id.toString())
        }
        
        savedCart = await cartToUpdate!.save()
  
    } catch (error) {
      console.log("Error creating cart: ", error);
      throw new DatabaseException();
    }
    
    return savedCart;
  }

  public async get(cartId: string) {
    let cart
    try {
      cart = await CartModel.findById(cartId);
    } catch (error) {
      throw new DatabaseException()
    }

    return cart;
  }

  public async clear(cartId: string) {
    try {
      await CartModel.findByIdAndRemove(cartId);
    } catch (error) {
      throw new DatabaseException()
    }

    return true;
  }
}

export default CartService;