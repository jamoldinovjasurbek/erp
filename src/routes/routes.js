import AuthRouter from "./auth.routes.js";
import CourseRoute from "./course.routes.js";
import GroupRouter from "./group.routes.js";
import StaffRouter from "./staff.routes.js";
import StudentRouter from "./student.route.js";
import teacherRoutes from "./teacher.routes.js";

const Routes = () => [
  AuthRouter,
  StaffRouter,
  StudentRouter,
  teacherRoutes,
  CourseRoute,
  GroupRouter,
];

export default Routes;
