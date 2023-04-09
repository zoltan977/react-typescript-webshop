import { Router } from "express";
import { UserAccountController } from "../controllers/UserAccountController";
import {Path} from '../constants/enum/Path';
import { RoutesClassInterface } from "../interfaces/RoutesClassInterface";
import validationMiddleware from "../middlewares/validatorMiddleware";
import { AddUserAccountItemsRequest } from "../DTO/AddUserAccountItemsRequest";
import authMiddleWare from "../middlewares/authMiddleware";

export class UserAccountRoutes implements RoutesClassInterface {
    public path = Path.USER_ACCOUNT;
    public router = Router();

    private userAccountController: UserAccountController

    constructor() {
        this.userAccountController = new UserAccountController();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post('/add', authMiddleWare(), validationMiddleware(AddUserAccountItemsRequest), this.userAccountController.add)
        this.router.get('/getByUser', authMiddleWare(), this.userAccountController.getByUser)
        this.router.delete('/customer-name/:id', authMiddleWare(), this.userAccountController.deleteCustomerName)
        this.router.delete('/delivery-address/:id', authMiddleWare(), this.userAccountController.deleteDeliveryAddress)
    }
}