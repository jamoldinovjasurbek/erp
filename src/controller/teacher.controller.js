import TeacherService from "../service/teacher.service.js";

class teacherController {
  constructor() {
    this.teacherService = new TeacherService();
  }
  async createTeacher(req, res, next) {
    try {
      const teacher = await this.teacherService.createTeacher(req.body);
      res.status(201).json({ success: true, teacher });
    } catch (error) {
      next(error);
    }
  }
}
export default teacherController;
