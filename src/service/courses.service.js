import { Course } from "../models/course.model.js";
import { CustomError } from "../utils/custom.error.js";

class CoursesService {
  async createCourse(data) {
    try {
      const exist = await Course.findOne({ name: data.name });
      if (exist) {
        throw new CustomError("course already exists", 400);
      }
      const course = await Course.create(data);
      console.log(data);

      return {
        course,
      };
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }
}
export default CoursesService;
