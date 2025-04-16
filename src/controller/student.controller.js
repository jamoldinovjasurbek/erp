
import StudentService from "../service/student.service.js";

class StudentController {
  constructor() {
    this.studentService=new StudentService()
  }

  createStudent = async (req, res, next) => {
    try {
      const student = await this.studentService.createStudent(req.body);
      res.status(201).json({ success: true, student });
    } catch (error) {
      next(error);
    }
  };

  getAllStudents = async (req, res, next) => {
    try {
      const { count,students  } = await this.studentService.getAllStudents();
      res.status(200).json({ success: true, count, students });
    } catch (error) {
      next(error);
    }
  };
}

export default StudentController;
