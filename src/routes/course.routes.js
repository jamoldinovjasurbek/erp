import { Router } from "express";
import CourseController from "../controller/courses.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";
import RoleMiddleware from "../middleware/role.middleware.js";

const CourseRoute = Router();
const controller = new CourseController();
const authMiddleware = new AuthMiddleware();
const roleMiddleware = new RoleMiddleware();

CourseRoute.post(
  "/courses",
  authMiddleware.verifyToken,
  roleMiddleware.allowRoles("superadmin", "admin"),
  controller.createCourse.bind(controller)
);

export default CourseRoute;
