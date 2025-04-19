import attendanceRouter from "./attendance.routes.js";
import AuthRouter from "./auth.routes.js";
import CourseRoute from "./course.routes.js";
import GroupRouter from "./group.routes.js";
import lessonRouter from "./lesson.routes.js";
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
  lessonRouter,
  attendanceRouter
];

export default Routes;
