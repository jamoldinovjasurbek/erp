import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    lesson_id: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
  },
  { timestamps: true }
);

export const Attendance= mongoose.model("Attendance", attendanceSchema);
