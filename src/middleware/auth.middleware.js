import JwtService from "../service/jwt.service.js";
import { CustomError } from "../utils/custom.error.js";

const jwtService = new JwtService();

class AuthMiddleware {
   verifyToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith("Bearer ")) {
        throw new CustomError("No token provided", 401);
      }

      const token = authHeader.split(" ")[1];
      const payload = jwtService.verifyToken(token);

      req.user = {
        id: payload.id,
        role: payload.role,
      };

      next();
    } catch (err) {
      next(err);
    }
  }
}

export default AuthMiddleware;
