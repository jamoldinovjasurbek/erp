import { Router } from "express";
import StudentController from "../controller/student.controller.js";

const StudentRouter = Router();
const controller = new StudentController();

StudentRouter.post("/students", controller.createStudent.bind(controller));
StudentRouter.get("/students", controller.getAllStudents.bind(controller));

export default StudentRouter;
