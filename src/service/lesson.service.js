import { Lesson } from "../models/lesson.model.js";
import { CustomError } from "../utils/custom.error.js";

class LessonService {
  async createLesson(data) {
    try {
      const exist = await Lesson.findOne({ _id: data.lesson_id });

      if (exist) {
        throw new CustomError("lesson already exists", 404);
      }
      const lesson = await Lesson.create(data);

      return {
        lesson,
      };
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }
}
export default LessonService;
