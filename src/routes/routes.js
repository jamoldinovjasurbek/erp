import AuthRouter from "./auth.routes.js";
import StaffRouter from "./staff.routes.js";
import StudentRouter from "./student.route.js";

const Routes =  () => [AuthRouter,StaffRouter,StudentRouter];

export default Routes;
