import { AppError } from "./appError";

export class FormError extends AppError {
    constructor(originalError?: any) {
        super(originalError)
    }
}