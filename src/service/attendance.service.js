import mongoose from "mongoose";
import AttendanceModel from "../models/attendance.model.js";
import AttendanceDetailModel from "../models/attendance_detail.model.js";
import { Lesson } from "../models/lesson.model.js";
import { CustomError } from "../utils/custom.error.js";
class AttendanceService {
  constructor() {
    this.attendanceModel = AttendanceModel;
    this.attendanceDetailModel = AttendanceDetailModel;
    this.lessonModel = Lesson;
  }

  async createAttendance(lessonId, data, createdBy) {
    try {
      const lesson = await this.lessonModel.findOne({ _id: lessonId });
      if (!lesson) {
        throw new CustomError("Lesson not found", 404);
      }
      const attendance = await this.attendanceModel.create({
        lesson_id: lesson._id,
        created_by: createdBy,
      });
      const attendanceDetails = data.attendances.map((attendanceData) => {
        return {
          attendance_id: attendance._id,
          student_id: new mongoose.Types.ObjectId(attendanceData.student_id),
          status: attendanceData.status,
          comment: attendanceData.comment || "",
        };
      });
      await this.attendanceDetailModel.insertMany(attendanceDetails);
      const attendanceCount = attendanceDetails.length;
      const presentCount = attendanceDetails.filter(
        (item) => item.status === "present"
      ).length;
      const absentCount = attendanceDetails.filter(
        (item) => item.status === "absent"
      ).length;
      const lateCount = attendanceDetails.filter(
        (item) => item.status === "late"
      ).length;
      return {
        success: true,
        message: "Davomat muvaffaqiyatli saqlandi",
        lesson: {
          id: lesson._id,
          title: lesson.title,
          lessonDate: lesson.lesson_date,
        },
        attendanceCount,
        present: presentCount,
        absent: absentCount,
        late: lateCount,
      };
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async getAttendanceByLessonId(lessonId) {
    try {
      const lesson = await this.lessonModel.findById(lessonId).populate({
        path: "group_id",
        select: "name",
      });
      if (!lesson) {
        throw new CustomError("Lesson not found", 404);
      }
      const attendance = await this.attendanceModel.findOne({
        lesson_id: lessonId,
      });
      if (!attendance) throw new CustomError("Attendance not found", 404);
      const details = await this.attendanceDetailModel
        .find({ attendance_id: attendance._id })
        .populate({
          path: "student_id",
          select: "firstName lastName",
        });
      const students = details.map((item) => ({
        student: {
          id: item.student_id._id,
          firstName: item.student_id.firstName,
          lastName: item.student_id.lastName,
        },
        status: item.status,
        comment: item.comment,
      }));
      const total = students.length;
      const present = students.filter((s) => s.status === "present").length;
      const absent = students.filter((s) => s.status === "absent").length;
      const late = students.filter((s) => s.status === "late").length;
      return {
        success: true,
        lesson: {
          id: lesson._id,
          title: lesson.title,
          lessonDate: lesson.lesson_date,
          group: {
            id: lesson.group_id._id,
            name: lesson.group_id.name,
          },
        },
        attendance: {
          total,
          present,
          absent,
          late,
          students,
        },
      };
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async getStudentAttendance(studentId, groupId, startDate, endDate) {
    try {
      const objectGroupId = new mongoose.Types.ObjectId(groupId);
      const objectStudentId = new mongoose.Types.ObjectId(studentId);
      const pipeline = [
        {
          $match: {
            group_id: objectGroupId,
            lesson_date: { $gte: new Date(startDate), $lte: new Date(endDate) },
          },
        },
        {
          $lookup: {
            from: "attendances",
            localField: "_id",
            foreignField: "lesson_id",
            as: "attendance",
          },
        },
        { $unwind: "$attendance" },
        {
          $lookup: {
            from: "attendance_details",
            localField: "attendance._id",
            foreignField: "attendance_id",
            as: "attendance_detail",
          },
        },
        { $unwind: "$attendance_detail" },
        {
          $match: {
            "attendance_detail.student_id": objectStudentId,
          },
        },
        {
          $project: {
            lesson_id: 1,
            lesson_title: 1,
            lesson_date: 1,
            status: "$attendance_detail.status",
            comment: "$attendance_detail.comment",
          },
        },
        {
          $group: {
            _id: "$attendance_detail.student_id",
            lessons: {
              $push: {
                lesson_id: "$lesson_id",
                lesson_title: "$lesson_title",
                lesson_date: "$lesson_date",
                status: "$status",
                comment: "$comment",
              },
            },
            totalLessons: { $sum: 1 },
            present: {
              $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] },
            },
            absent: {
              $sum: { $cond: [{ $eq: ["$status", "absent"] }, 1, 0] },
            },
            late: {
              $sum: { $cond: [{ $eq: ["$status", "late"] }, 1, 0] },
            },
          },
        },
        {
          $lookup: {
            from: "students",
            localField: "_id",
            foreignField: "_id",
            as: "student",
          },
        },
        { $unwind: "$student" },
        {
          $project: {
            student_id: "$_id",
            firstName: "$student.firstName",
            lastName: "$student.lastName",
            lessons: 1,
            totalLessons: 1,
            present: 1,
            absent: 1,
            late: 1,
            presentPercentage: {
              $cond: [
                { $eq: ["$totalLessons", 0] },
                0,
                {
                  $multiply: [{ $divide: ["$present", "$totalLessons"] }, 100],
                },
              ],
            },
          },
        },
      ];
      const result = await this.lessonModel.aggregate(pipeline);
      return {
        success: true,
        student: {
          id: result[0].student_id,
          firstName: result[0].firstName,
          lastName: result[0].lastName,
        },
        attendance: {
          totalLessons: result[0].totalLessons,
          present: result[0].present,
          absent: result[0].absent,
          late: result[0].late,
          presentPercentage: result[0].presentPercentage,
          lessons: result[0].lessons,
        },
      };
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }
}

export default AttendanceService;
