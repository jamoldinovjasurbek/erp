import { Router } from "express";
import StaffController from "../controller/staff.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";
import RoleMiddleware from "../middleware/role.middleware.js";
const StaffRouter=Router()
const controller=new StaffController();

StaffRouter.post("/staffs",controller.createStaff.bind(controller));
StaffRouter.get("/staffs", controller.getAllStaffs.bind(controller));

export default StaffRouter;