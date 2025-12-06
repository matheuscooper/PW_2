import jwt from "jsonwebtoken";
import { IJwtProvider } from "../IJwt.provider";

export class JwtProvider implements IJwtProvider {
  constructor(private readonly secret: string) {}

  sign(payload: object): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: "7d", // token dura 7 dias
    });
  }

  verify(token: string) {
    return jwt.verify(token, this.secret);
  }
}
