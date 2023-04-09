import { UserModelInterface } from "../models/user/user";
import jwt from "jsonwebtoken";
import { NoJWTsecretException } from "../exceptions/authExceptions/NoJWTsecretException";

const createToken = (user: UserModelInterface) => {
  const payload = {
    user: {
      username: user.username,
      email: user.email,
      photo: user.photo,
      admin: user.admin
    },
  };

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new NoJWTsecretException();
  }

  const token = jwt.sign(payload, secret, {
    expiresIn: 3600,
  });

  return token;
};

export default createToken;
