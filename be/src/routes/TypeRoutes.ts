import { Router } from "express";
import { TypeController } from "../controllers/TypeController";
import {Path} from '../constants/enum/Path';
import { RoutesClassInterface } from "../interfaces/RoutesClassInterface";

export class TypeRoutes implements RoutesClassInterface {
    public path = Path.TYPE;
    public router = Router();

    private typeController: TypeController

    constructor() {
        this.typeController = new TypeController();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/category', this.typeController.getCategoryList)
    }
}