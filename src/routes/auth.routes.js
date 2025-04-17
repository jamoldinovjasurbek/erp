import { Router } from "express";
import { AuthController } from "../controller/auth.controller.js";
import RoleMiddleware from "../middleware/role.middleware.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const AuthRouter = Router();

const controller = new AuthController();
const authMiddleware = new AuthMiddleware();
const roleMiddleware = new RoleMiddleware();

AuthRouter.post("/staff/login", controller.loginStaff.bind(controller));
AuthRouter.post("/student/login", controller.loginStudent.bind(controller));

AuthRouter.post(
  "/staff/register",
  authMiddleware.verifyToken,
  roleMiddleware.allowRoles("superadmin", "admin"),
  controller.registerStaff.bind(controller)
);

AuthRouter.post(
  "/student/register",
  authMiddleware.verifyToken,
  roleMiddleware.allowRoles("superadmin", "admin"),
  controller.registerStudent.bind(controller)
);
export default AuthRouter;
