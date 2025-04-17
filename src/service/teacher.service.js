import { Staff } from "../models/staff.model.js";
import { Teacher } from "../models/teacher.model.js";
import { CustomError } from "../utils/custom.error.js";

class TeacherService {
  async createTeacher(data) {
    try {
      const exist = await Teacher.findOne({ staffId: data.staffId });
      if (exist) {
        throw new CustomError("Teacher already exists", 400);
      }
      const teacher = await Teacher.create(data);
      console.log(teacher);

      const populated = await Teacher.findById(teacher._id).populate({
        path: "staffId",
        select: "first_name last_name",
      });

      return {
        populated,
      };
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }
}

export default TeacherService;
