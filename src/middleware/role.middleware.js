import { CustomError } from "../utils/custom.error.js";

class RoleMiddleware {
  allowRoles(...allowedRoles) {
    return (req, res, next) => {
      const userRole = req.user?.role;
      if (!allowedRoles.includes(userRole)) {
        throw new CustomError("You do not have access", 403);
      }
      next();
    };
  }
}

export default RoleMiddleware;
