import { RegularExpressions } from "../../shared/constants/regularExpressions";
import { IsEmail, Matches, MinLength } from "../../shared/utils/classValidatorWithErrorMessage";

export class LoginModel {

    @IsEmail()
    email: string;

    @MinLength(8)
    @Matches(RegularExpressions.AT_LEAST_ONE_NUMBER)
    password: string;
}