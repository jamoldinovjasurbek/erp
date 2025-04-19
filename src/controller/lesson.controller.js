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
  async getLessonsByGroup(req, res, next) {
    try {
      const { groupId } = req.params;
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Start and end dates are required",
          });
      }

      const lessons = await this.lessonService.getLessonsByGroup(
        groupId,
        startDate,
        endDate
      );
      res.status(200).json({ success: true, lessons });
    } catch (error) {
      next(error);
    }
  }
}

export default LessonController;
