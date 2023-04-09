import { registerDecorator, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';

const getRegisterDecoratorCaller = (constraints: any[], validationConstrintClass: Function | ValidatorConstraintInterface, 
    validationOptions?: ValidationOptions) => (object: Object, propertyName: string): void => {
    registerDecorator({
        target: object.constructor,
        propertyName,
        options: validationOptions,
        constraints,
        validator: validationConstrintClass,
    });
};

export const getDecoratorFunction = (validationConstrintClass: Function | ValidatorConstraintInterface) => 
(validationOptions?: ValidationOptions) => {
    return getRegisterDecoratorCaller([], validationConstrintClass, validationOptions)
};

export const getGenericDecoratorFunctionWithProperty = (validationConstrintClass: Function | ValidatorConstraintInterface) => 
<T>(property: keyof T, validationOptions?: ValidationOptions) => {
    return getRegisterDecoratorCaller([property], validationConstrintClass, validationOptions)
};

export const getDecoratorFunctionWithParameter = (validationConstrintClass: Function | ValidatorConstraintInterface) => 
(parameter: any, validationOptions?: ValidationOptions) => {
    return getRegisterDecoratorCaller([parameter], validationConstrintClass, validationOptions)
};