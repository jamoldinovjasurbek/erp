import bcrypt from "bcrypt";
import { Staff } from "../models/staff.model.js";
import { Student } from "../models/student.model.js";
import JwtService from "./jwt.service.js";

export class AuthService {
  constructor() {
    this.jwtService = new JwtService();
    this.staff = Staff
  }
  async loginStaff(username, password) {
    const staff = await this.staff.findOne({ username });
    if (!staff) throw new Error("Staff not found");

    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = this.jwtService.generateTokenStaff(staff.id,staff.role);

    return {
      token,
      staff: {
        id: staff._id,
        first_name: staff.first_name,
        last_name: staff.last_name,
        username: staff.username,
        role: staff.role,
        position: staff.position,
      },
    };
  }

  async loginStudent(username, password) {
    const student = await Student.findOne({ username });
    if (!student) throw new Error("Student not found");

    const isMatch = await bcrypt.compare(password, student.password);
    console.log(isMatch);

    if (!isMatch) throw new Error("Invalid credentials");

    const token = this.jwtService.sign({ id: student._id });

    return {
      token,
      student: {
        id: student._id,
        firstName: student.first_name,
        lastName: student.last_name,
        username: student.username,
      },
    };
  }

  async registerStaff(data) {
    const { first_name, last_name, username, password, position, role } = data;

    const existing = await Staff.findOne({ username });
    if (existing) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const staff = await Staff.create({
      first_name,
      last_name,
      username,
      password: hashedPassword,
      position,
      role,
    });

    return staff;
  }

  async registerStudent(data) {
    const { first_name, last_name, username, password } = data;

    const existing = await Student.findOne({ username });
    if (existing) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const student = await Student.create({
      first_name,
      last_name,
      username,
      password: hashedPassword,
    });

    return student;
  }
}
