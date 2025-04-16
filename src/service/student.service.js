import { Student } from "../models/student.model.js";
import { CustomError } from "../utils/custom.error.js";
import bcrypt from "bcrypt";

class StudentService {
  async createStudent(data) {
    try {
      const exist = await Student.findOne({ username: data.username });
      if (exist) {
        throw new CustomError("username already exists", 400);
      }
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
      const student = await Student.create(data);

      return {
        student,
      };
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async getAllStudents() {
    const students = await Student.find();
    const count = await Student.countDocuments();

    return { students, count };
  }
}

export default StudentService;
