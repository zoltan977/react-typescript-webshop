import { Router } from "express";
import {Path} from '../constants/enum/Path';
import { RoutesClassInterface } from "../interfaces/RoutesClassInterface";
import validationMiddleware from "../middlewares/validatorMiddleware";
import { AddProductRequest } from "../DTO/AddProductRequest";
import { ProductController } from "../controllers/ProductController";
import authMiddleWare from "../middlewares/authMiddleware";
import { UpdateProductRequest } from "../DTO/UpdateProductRequest";

export class ProductRoutes implements RoutesClassInterface {
    public path = Path.PRODUCT;
    public router = Router();

    private productController: ProductController

    constructor() {
        this.productController = new ProductController();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post('/add', authMiddleWare(true), validationMiddleware(AddProductRequest), this.productController.add)
        this.router.put('/update', authMiddleWare(true), validationMiddleware(UpdateProductRequest), this.productController.update)
        this.router.get('/getAll', this.productController.getAll)
        this.router.get('/get/:id', this.productController.get)
        this.router.delete('/delete/:id', authMiddleWare(true), this.productController.delete)
    }
}