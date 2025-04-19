import { Router } from "express";
import AuthMiddleware from "../middleware/auth.middleware.js";
import RoleMiddleware from "../middleware/role.middleware.js";
import AttendanceController from "../controller/attendance.controller.js";

const attendanceRouter = Router();
const controller = new AttendanceController();
const authMiddleware = new AuthMiddleware();
const roleMiddleware = new RoleMiddleware();

attendanceRouter.post(
  "/lessons/:lessonId/attendance",
  authMiddleware.verifyToken,
  roleMiddleware.allowRoles("admin", "teacher"),
  controller.createAttendanceController.bind(controller)
);

attendanceRouter.get(
  "/lessons/:lessonId/attendance",
  authMiddleware.verifyToken,
  roleMiddleware.allowRoles("admin", "teacher", "student"),
  controller.getAttendanceByLessonIdController.bind(controller)
);

attendanceRouter.get(
  "/students/:studentId/attendance",
  authMiddleware.verifyToken,
  roleMiddleware.allowRoles("admin", "teacher", "student"),
  controller.getStudentAttendanceController.bind(controller)
);

export default attendanceRouter;
