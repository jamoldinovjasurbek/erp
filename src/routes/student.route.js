import { Router } from "express";
import StudentController from "../controller/student.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";
import RoleMiddleware from "../middleware/role.middleware.js";

const StudentRouter = Router();
const controller = new StudentController();
const roleMiddleware = new RoleMiddleware();
const authMiddleware = new AuthMiddleware();
StudentRouter.post(
  "/students",
  authMiddleware.verifyToken,
  roleMiddleware.allowRoles("admin"),
  controller.createStudent.bind(controller)
);
StudentRouter.get(
  "/students",
  authMiddleware.verifyToken,
  roleMiddleware.allowRoles("admin", "teacher"),
  controller.getAllStudents.bind(controller)
);

export default StudentRouter;
