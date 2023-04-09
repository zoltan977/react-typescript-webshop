import { Router } from "express";
import { CartController } from "../controllers/CartController";
import {Path} from '../constants/enum/Path';
import { RoutesClassInterface } from "../interfaces/RoutesClassInterface";
import validationMiddleware from "../middlewares/validatorMiddleware";
import { AddCartItemRequest } from "../DTO/AddCartItemRequest";
import { RemoveCartItemRequest } from "../DTO/RemoveCartItemRequest";
import authMiddleWare from "../middlewares/authMiddleware";

export class CartRoutes implements RoutesClassInterface {
    public path = Path.CART;
    public router = Router();

    private cartController: CartController

    constructor() {
        this.cartController = new CartController();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post('/add', validationMiddleware(AddCartItemRequest) ,this.cartController.add)
        this.router.post('/remove', validationMiddleware(RemoveCartItemRequest) ,this.cartController.remove)
        this.router.get('/get/:cartId', this.cartController.get)
        this.router.delete('/clear/:cartId', this.cartController.clear)
    }
}