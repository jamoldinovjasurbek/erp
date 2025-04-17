import LessonService from "../service/lesson.service.js";

class LessonController {
  constructor() {
    this.lessonService = new LessonService();
  }
  async createLesson(req, res, next) {
    try {
      const lesson = await this.lessonService.createLesson(req.body);
      res.status(201).json({ success: true, lesson });
    } catch (error) {
      next(error);
    }
  }
}
export default LessonController;
