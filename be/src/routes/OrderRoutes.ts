import { Router } from "express";
import {Path} from '../constants/enum/Path';
import { RoutesClassInterface } from "../interfaces/RoutesClassInterface";
import validationMiddleware from "../middlewares/validatorMiddleware";
import { AddOrderRequest } from "../DTO/AddOrderRequest";
import { OrderController } from "../controllers/OrderController";
import authMiddleWare from "../middlewares/authMiddleware";
import { UpdateOrderStatusRequest } from "../DTO/UpdateOrderStatusRequest";

export class OrderRoutes implements RoutesClassInterface {
    public path = Path.ORDER;
    public router = Router();

    private orderController: OrderController

    constructor() {
        this.orderController = new OrderController();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post('/add', authMiddleWare(), validationMiddleware(AddOrderRequest), this.orderController.add)
        this.router.put('/update', authMiddleWare(true), validationMiddleware(UpdateOrderStatusRequest), this.orderController.update)
        this.router.get('/getAll', authMiddleWare(true), this.orderController.getAll)
        this.router.get('/getAllByUser', authMiddleWare(), this.orderController.getAllByUser)
        this.router.get('/get/:id', authMiddleWare(), this.orderController.get)
        this.router.delete('/delete/:id', authMiddleWare(true), this.orderController.delete)

    }
}