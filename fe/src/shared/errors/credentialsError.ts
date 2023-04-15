import { AppError } from "./appError";

export class CredentialsError extends AppError {
    constructor(originalError?: any) {
        super(originalError)
    }
}