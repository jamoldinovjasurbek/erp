import { Router } from "express";
import StaffController from "../controller/staff.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";
import RoleMiddleware from "../middleware/role.middleware.js";
const StaffRouter = Router();
const controller = new StaffController();
const authMiddleware = new AuthMiddleware();
const roleMiddleware = new RoleMiddleware();

StaffRouter.post(
  "/staffs",
  authMiddleware.verifyToken,
  roleMiddleware.allowRoles("superadmin", "admin"),
  controller.createStaff.bind(controller)
);
StaffRouter.get(
  "/staffs",
  authMiddleware.verifyToken,
  roleMiddleware.allowRoles("superadmin", "admin"),
  controller.getAllStaffs.bind(controller)
);

export default StaffRouter;
