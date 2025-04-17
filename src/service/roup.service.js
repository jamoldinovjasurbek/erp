import { Course } from "../models/course.model.js";
import { Group } from "../models/group.model.js";
import { CustomError } from "../utils/custom.error.js";

class GroupService {
  async createGroup(data) {
    try {
      const exist = await Course.findById({ _id: data.course_id });
      if (!exist) {
        throw new CustomError("Course not found", 404);
      }
      const group = await Group.create(data);

      const populated = await Group.findById(group._id)
        .populate({
          path: "course_id",
          select: "name",
        })
        .populate({
          path: "teacher_id",
          populate: {
            path: "staffId",
            select: "first_name last_name",
          },
        });

      return {
        populated,
      };
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }
}

export default GroupService;
