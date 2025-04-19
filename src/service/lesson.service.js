import AttendanceModel from "../models/attendance.model.js";
import { Lesson } from "../models/lesson.model.js";
import { CustomError } from "../utils/custom.error.js";
import AttendanceDetailModel from "../models/attendance_detail.model.js";

class LessonService {
  async createLesson(data) {
    try {
      const exist = await Lesson.findOne({ _id: data.lesson_id });

      if (exist) {
        throw new CustomError("lesson already exists", 404);
      }
      const lesson = await Lesson.create(data);
      const populated = await Lesson.findById(lesson._id).populate({
        path: "group_id",
      });
      return {
        populated,
      };
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }
  async getLessonsByGroup(groupId, startDate, endDate) {
    try {
      const lessons = await Lesson.find({
        group_id: groupId,
        lesson_date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });

      const lessonsWithAttendance = await Promise.all(
        lessons.map(async (lesson) => {
          const attendance = await AttendanceModel.findOne({
            lesson_id: lesson._id,
          });
          if (!attendance) {
            return {
              ...lesson.toObject(),
              attendance: {
                total: 0,
                present: 0,
                absent: 0,
                late: 0,
              },
            };
          }

          const attendanceDetails = await AttendanceDetailModel.find({
            attendance_id: attendance._id,
          });
          const total = attendanceDetails.length;
          const present = attendanceDetails.filter(
            (item) => item.status === "present"
          ).length;
          const absent = attendanceDetails.filter(
            (item) => item.status === "absent"
          ).length;
          const late = attendanceDetails.filter(
            (item) => item.status === "late"
          ).length;

          return {
            ...lesson.toObject(),
            attendance: {
              total,
              present,
              absent,
              late,
            },
          };
        })
      );

      return lessonsWithAttendance;
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }
}

export default LessonService;
