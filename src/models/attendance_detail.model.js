import mongoose from "mongoose";
const { Schema } = mongoose;

const AttendanceDetailSchema = Schema(
  {
    attendance_id: {
      type: Schema.Types.ObjectId,
      ref: "attendance",
    },
    student_id: {
      type: Schema.Types.ObjectId,
      ref: "student",
    },
    status: {
      type: String,
      enum: ["present", "absent", "late"],
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

AttendanceDetailSchema.index(
  { attendance_id: 1, student_id: 1 },
  { unique: true }
);

const AttendanceDetailModel = mongoose.model(
  "attendance_detail",
  AttendanceDetailSchema
);
export default AttendanceDetailModel;
