import { Router } from "express";
import teacherController from "../controller/teacher.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";
import RoleMiddleware from "../middleware/role.middleware.js";

const teacherRoutes = Router();
const controller = new teacherController();
const authMiddleware = new AuthMiddleware();
const roleMiddleware = new RoleMiddleware();
teacherRoutes.post(
  "/teachers",
  authMiddleware.verifyToken,
  roleMiddleware.allowRoles("superadmin", "admin"),
  controller.createTeacher.bind(controller)
);
export default teacherRoutes;
