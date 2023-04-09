import { RequestHandler } from 'express';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../exceptions/HttpException';
import { DTOValidationException } from '../exceptions/DTOValidationException';

const createFlatArrayFromChildErrors = (errors: ValidationError[]): ValidationError[] => {
    const errorsArray: ValidationError[] = [];

    for (const error of errors) {
        const currentError = error;
        let currentChild = error;
        while (currentChild.children?.length) {
            currentChild = currentChild.children.pop() as ValidationError;
            if (!(currentChild.target as any).prototype) {
                currentError.property = `${currentError.property}.${currentChild.property}`;
            }
            currentError.value = currentChild.value;
            currentError.constraints = currentChild.constraints;
        }
        errorsArray.push(currentError);
    }

    return errorsArray;
}

const validationMiddleware = (type: any, skipMissingProperties = false, otherValidatorOptions?: Partial<ValidatorOptions>): RequestHandler => {
    return async (req, res, next): Promise<any> => {
        try {
            const errors: ValidationError[] = await validate(plainToInstance(type, req.body), {
                skipMissingProperties,
                forbidUnknownValues: true,
                ...otherValidatorOptions,
            });
            if (errors.length > 0) {
                console.log("Validation errorsArray:", errors)
                const flatErrorsArray = createFlatArrayFromChildErrors(errors);
                console.log("Validation flatErrorsArray: ", flatErrorsArray);

                const message = flatErrorsArray.map((error: ValidationError) => Object.values(error.constraints!).join(", ")).join(', ');
                const data = flatErrorsArray.map((error: ValidationError) => ({
                    property: error.property, 
                    constraints: error.constraints!,
                }))

                next(new HttpException(StatusCodes.BAD_REQUEST, message, {errorsInPostedData: data}));
            } else {
                next();
            }
        } catch (e) {
            console.error("DTO validation Error: ", e);
            next(new DTOValidationException());
        }

    };
};

export default validationMiddleware;
