import {
    ValidationOptions, buildMessage,
    IsNotEmpty as _IsNotEmpty,
    MinLength as _MinLength,
    Matches as _Matches,
    IsEmail as _IsEmail,
    IsIn as _IsIn,
    IsInt as _IsInt,
    IsNumber as _IsNumber,
    IsUrl as _IsUrl,
    IsPositive as _IsPositive,
    ValidationArguments,
    IsNumberOptions
} from "class-validator";
import { ErrorMessage } from "../constants/errorMessage";
import ValidatorJS from 'validator';

//lookup existing message interpolation patterns in the source:
//https://github.com/typestack/class-validator/blob/develop/src/decorator/number/Max.ts

export const IsNotEmpty = (validationOptions?: ValidationOptions): PropertyDecorator =>
_IsNotEmpty({...validationOptions, message: ErrorMessage.REQUIRED});

export const IsInt = (validationOptions?: ValidationOptions): PropertyDecorator =>
_IsInt({...validationOptions, message: ErrorMessage.IS_INT});

export const IsPositive = (validationOptions?: ValidationOptions): PropertyDecorator =>
_IsPositive({...validationOptions, message: ErrorMessage.IS_POSITIVE});

export const IsEmail = (options?: ValidatorJS.IsEmailOptions, validationOptions?: ValidationOptions): PropertyDecorator => 
_IsEmail(options, {...validationOptions, message: ErrorMessage.INVALID_EMAIL});

export const IsUrl = (options?: ValidatorJS.IsURLOptions, validationOptions?: ValidationOptions): PropertyDecorator => 
_IsUrl(options, {...validationOptions, message: ErrorMessage.INVALID_URL});

export const IsNumber = (options: IsNumberOptions = {}, validationOptions?: ValidationOptions): PropertyDecorator => 
_IsNumber(options, {...validationOptions, message: ErrorMessage.IS_NUMBER});

export const MinLength = (min: number, validationOptions?: ValidationOptions): PropertyDecorator =>
_MinLength(min, {...validationOptions, message: ErrorMessage.MIN_LENGTH("$constraint1") });

export const Matches = (pattern: RegExp, validationOptions?: ValidationOptions): PropertyDecorator =>
_Matches(pattern, {...validationOptions, message: buildMessage((eachPrefix, args?: ValidationArguments) => 
    ErrorMessage.MATCHES(args?.property || '', String(args?.constraints[0])))});

export const IsIn = (values: readonly any[], validationOptions?: ValidationOptions): PropertyDecorator =>
_IsIn(values, {...validationOptions, message: ErrorMessage.INVALID_CATEGORY});