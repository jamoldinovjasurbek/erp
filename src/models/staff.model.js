import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "teacher"],
      required: true,
    },
    position: { type: String, required: true },
    phone: String,
    address: String,
    hire_date: { type: Date, default: Date.now },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export const Staff = mongoose.model("Staff", staffSchema);
