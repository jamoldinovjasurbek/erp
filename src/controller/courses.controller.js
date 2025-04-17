import CoursesService from "../service/courses.service.js";

class CourseController {
  constructor() {
    this.courseService = new CoursesService();
  }
  async createCourse(req, res, next) {
    try {
      const course = await this.courseService.createCourse(req.body);
      res.status(201).json({ success: true, course });
    } catch (error) {
      next(error);
    }
  }
}
export default CourseController;
