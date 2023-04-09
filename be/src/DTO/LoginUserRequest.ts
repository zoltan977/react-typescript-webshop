import { RegularExpressions } from "../constants/object/regularExpressions";
import { IsEmail, IsString, Matches, MinLength } from "../utils/classValidatorWithErrorMessage";

export interface LoginUserRequestInterface {
    email: string;
    password: string;
}

export class LoginUserRequest implements LoginUserRequestInterface {
    @IsEmail()
    public email!: string;

    @IsString()
    @MinLength(8)
    @Matches(RegularExpressions.AT_LEAST_ONE_NUMBER)
    public password!: string;
}
