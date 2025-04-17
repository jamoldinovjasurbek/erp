import GroupService from "../service/roup.service.js";

class GroupController {
  constructor() {
    this.groupService = new GroupService();
  }
  async createGroupController(req, res, next) {
    try {
      const group = await this.groupService.createGroup(req.body);
      res.status(201).json({ success: true, group });
    } catch (error) {
      next(error);
    }
  }
}
export default GroupController;
