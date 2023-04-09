import { NextFunction, Request, Response } from "express";
import AuthService from "../services/AuthService";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public signUp = async (req: Request, res: Response, next: NextFunction) => {
        console.log("req.body: ", req.body)
        try {
            const result = await this.authService.signUp(
                req.body
            );
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        console.log("req.body: ", req.body)
        try {
            const result = await this.authService.login(
                req.body
            );
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }
}