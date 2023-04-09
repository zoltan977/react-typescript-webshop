import { NextFunction, Request, Response } from "express";
import ProductService from "../services/ProductService";

export class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    public add = async (req: Request, res: Response, next: NextFunction) => {
        console.log("req.body: ", req.body)
        try {
            const result = await this.productService.add(
                req.body
            );
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.productService.getAll();
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }

    public get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productId = req.params.id
            const result = await this.productService.get(productId);
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.productService.update(req.body);
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        console.log("deleteProduct")
        try {
            const productId = req.params.id
            const result = await this.productService.delete(productId);
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }
}