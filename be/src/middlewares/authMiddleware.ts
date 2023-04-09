import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { NoJWTsecretException } from "../exceptions/authExceptions/NoJWTsecretException";
import { UnauthorizedException } from "../exceptions/authExceptions/UnauthorizedException";

const authMiddleWare = (admin: boolean = false) => async (request: Request, response: Response, next: NextFunction) => {
    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            next(new NoJWTsecretException())
        }

        const authorizationHeader: string | undefined = request.header("Authorization");
        if (!authorizationHeader) {
            next(new UnauthorizedException())
        }

        const token = authorizationHeader!.split(" ")[1];
        if (!token) {
            next(new UnauthorizedException())
        }

        let decodedToken: any 
        try {
            decodedToken= verify(token as string, jwtSecret as string)
        } catch (error) {
            next(new UnauthorizedException())
        }
        console.log("auth middleware decodedToken: ", decodedToken)
        if (!decodedToken.user) {
            next(new UnauthorizedException())
        }
        if (admin && !decodedToken.user.admin) {
            next(new UnauthorizedException())
        }

        response.locals.user = decodedToken.user;
        next();
    } catch (error) {
        next(error)
    }
}

export default authMiddleWare;