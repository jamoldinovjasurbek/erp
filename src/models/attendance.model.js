import mongoose from "mongoose";
const { Schema } = mongoose;

const AttendanceSchema = Schema(
  {
    lesson_id: {
      type: Schema.Types.ObjectId,
      ref: "lesson",
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "staff",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const AttendanceModel = mongoose.model("attendance", AttendanceSchema);
export default AttendanceModel;
