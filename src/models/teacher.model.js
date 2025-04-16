import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    staff_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    expertise: String,
    bio: String,
    languages: [String],
  },
  { timestamps: true }
);

export const Teacher = mongoose.model("Teacher", teacherSchema);
