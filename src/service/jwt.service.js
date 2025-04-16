import jwt from "jsonwebtoken";
import { CustomError } from "../utils/custom.error.js";

class JwtService {
  constructor() {
    this.secretKey = process.env.JWT_SECRET;
    if (!this.secretKey) {
      throw new Error("JWT_SECRET_KEY is not defined in .env");
    }
  }

  generateTokenStaff(userId, role) {
    try {
      const accessToken = jwt.sign({ userId, role }, this.secretKey, {
        expiresIn: "1h",
      });

      const refreshToken = jwt.sign({ userId, role }, this.secretKey, {
        expiresIn: "7d",
      });

      return { accessToken, refreshToken };
    } catch (error) {
      throw new CustomError("Failed to generate staff token", 500);
    }
  }

  generateTokenStudent(userId) {
    try {
      const accessToken = jwt.sign({ userId }, this.secretKey, {
        expiresIn: "2h",
      });

      const refreshToken = jwt.sign({ userId }, this.secretKey, {
        expiresIn: "7d",
      });

      return { accessToken, refreshToken };
    } catch (error) {
      throw new CustomError("Failed to generate student token", 500);
    }
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      throw new CustomError("Invalid or expired token", 401);
    }
  }
}

export default JwtService;
