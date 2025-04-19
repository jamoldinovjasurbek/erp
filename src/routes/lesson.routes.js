import { Router } from "express";
import LessonController from "../controller/lesson.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";
import RoleMiddleware from "../middleware/role.middleware.js";

const lessonRouter = Router();
const controller = new LessonController();
const authMiddleware = new AuthMiddleware();
const roleMiddleware = new RoleMiddleware();
lessonRouter.post(
  "/lessons",
  authMiddleware.verifyToken,
  roleMiddleware.allowRoles("admin", "teacher"),
  controller.createLesson.bind(controller)
);

lessonRouter.get("/groups/:groupId/lessons",authMiddleware.verifyToken,roleMiddleware.allowRoles("admin","teacher","student"),controller.getLessonsByGroup.bind(controller));
export default lessonRouter;