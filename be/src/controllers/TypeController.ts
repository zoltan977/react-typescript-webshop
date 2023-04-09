import { NextFunction, Request, Response } from "express";
import TypeService from "../services/TypeService";

export class TypeController {
    private typeService: TypeService;

    constructor() {
        this.typeService = new TypeService();
    }

    public getCategoryList = async (req: Request, res: Response, next: NextFunction) => {
        console.log("controller getCategorylist")
        try {
            const result = await this.typeService.getCategoryList();
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }
}