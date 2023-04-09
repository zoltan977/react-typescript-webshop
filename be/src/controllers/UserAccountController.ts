import { NextFunction, Request, Response } from "express";
import UserAccountService from "../services/UserAccountService";

export class UserAccountController {
    private userAccountService: UserAccountService;

    constructor() {
        this.userAccountService = new UserAccountService();
    }

    public add = async (req: Request, res: Response, next: NextFunction) => {
        console.log("req.body: ", req.body)
        try {
            const result = await this.userAccountService.add(
                req.body
            );
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }

    public getByUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userEmail = res?.locals?.user?.email;
            const result = await this.userAccountService.getByUser(userEmail);
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }

    public deleteCustomerName = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userEmail = res?.locals?.user?.email;
            const customerNameId = req.params.id

            const result = await this.userAccountService.deleteCustomerName(userEmail, customerNameId);
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }

    public deleteDeliveryAddress = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userEmail = res?.locals?.user?.email;
            const deliveryAddressId = req.params.id

            const result = await this.userAccountService.deleteDeliveryAddress(userEmail, deliveryAddressId);
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }

}