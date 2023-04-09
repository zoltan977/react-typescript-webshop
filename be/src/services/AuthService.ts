import User from "../models/user/user";
import bcrypt from "bcryptjs";
import { RegisterUserRequestInterface } from "../DTO/RegisterUserRequest";
import { UserAlreadyExistsException } from "../exceptions/authExceptions/UserAlreadyExistsException";
import { DatabaseException } from "../exceptions/DatabaseException";
import createToken from "../utils/createToken";
import { InvalidCredentialsException } from "../exceptions/authExceptions/InvalidCredentialsException";

class AuthService {
  public async signUp(registrationData: RegisterUserRequestInterface) {
      console.log("registrationData:", registrationData)
      const { username, email, password } = registrationData;

      const user = await User.findOne({ email });
    
      if (user) {
        throw new UserAlreadyExistsException();
      }
    
      let savedUser
      try {
        const newUser = new User({ username, email, password });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
              
        savedUser = await newUser.save();
    
      } catch (error) {
        console.log("Error creating user: ", error);
        throw new DatabaseException();
      }
    
      return {token: createToken(savedUser)};
  }

  public async login(loginData: RegisterUserRequestInterface) {
    console.log("loginData:", loginData)
    const { email, password } = loginData;

    const user = await User.findOne({ email });
  
    if (!user) {
      throw new InvalidCredentialsException();
    }
  
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new InvalidCredentialsException();
    }

    const token = createToken(user);

    return { token };
  }
}

export default AuthService;