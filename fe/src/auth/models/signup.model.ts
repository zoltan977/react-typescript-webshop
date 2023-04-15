import { RegularExpressions } from "../../shared/constants/regularExpressions";
import { PasswordMatch } from "../../shared/utils/customValidators/passwordMatch";
import { IsEmail, Matches, MinLength, IsNotEmpty } from "../../shared/utils/classValidatorWithErrorMessage";

export class SignupModel {

    @IsNotEmpty()
    username: string;
    
    @IsEmail()
    email: string;

    @MinLength(8)
    @Matches(RegularExpressions.AT_LEAST_ONE_NUMBER)
    password: string;

    @PasswordMatch<SignupModel>('password')
    confirmPassword: string;
}