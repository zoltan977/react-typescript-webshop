import { NextFunction, Request, Response } from "express";
import CartService from "../services/CartService";

export class CartController {
    private cartService: CartService;

    constructor() {
        this.cartService = new CartService();
    }

    public add = async (req: Request, res: Response, next: NextFunction) => {
        console.log("req.body: ", req.body)
        try {
            const result = await this.cartService.add(
                req.body
            );
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        console.log("req.body: ", req.body)
        try {
            const result = await this.cartService.remove(
                req.body
            );
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }

    public get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cartId = req.params.cartId;
            const result = await this.cartService.get(
                cartId
            );
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }

    public clear = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cartId = req.params.cartId;
            const result = await this.cartService.clear(
                cartId
            );
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }
}