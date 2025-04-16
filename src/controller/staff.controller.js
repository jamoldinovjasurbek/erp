// controllers/staff.controller.js
import StaffService from "../service/staff.service.js";

class StaffController {
  constructor() {
    this.staffService = new StaffService();
  }

  createStaff = async (req, res, next) => {
    try {
      const staff = await this.staffService.createStaff(req.body);

      res.status(201).json({ success: true, staff });
    } catch (error) {
      next(error);
    }
  };

  getAllStaffs = async (req, res, next) => {
    try {
      const { count, staffs } = await this.staffService.getAllStaffs();
      res.status(200).json({ success: true, count, staffs });
    } catch (error) {
      next(error);
    }
  };
}

export default StaffController;
