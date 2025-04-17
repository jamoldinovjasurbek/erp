import { Router } from "express";
import GroupController from "../controller/groups.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";
import RoleMiddleware from "../middleware/role.middleware.js";

const GroupRouter = Router();
const controller = new GroupController();
const authMiddleware = new AuthMiddleware();
const roleMiddleware = new RoleMiddleware();

GroupRouter.post(
  "/groups",
  authMiddleware.verifyToken,
  roleMiddleware.allowRoles("admin"),
  controller.createGroupController.bind(controller)
);

export default GroupRouter;
