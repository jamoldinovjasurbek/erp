import { Staff } from "../models/staff.model.js";
import { CustomError } from "../utils/custom.error.js";
import bcrypt from "bcrypt";

class StaffService {
  async createStaff(data) {
    try {
      const exist = await Staff.findOne({ username: data.username });

      if (exist) {
        throw new CustomError("Username already exists", 400);
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
      const staff = await Staff.create(data);

      return {
        staff,
      };
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async getAllStaffs() {
    const staffs = await Staff.find();
    const count = await Staff.countDocuments();

    return { staffs, count };
  }
}

export default StaffService;
