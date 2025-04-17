import "dotenv/config";
import bcrypt from "bcrypt";
import { Staff } from "../models/staff.model.js";

const createSuperAdmin = async () => {
  try {
    const existing = await Staff.findOne({
      username: process.env.SUPERADMIN_USERNAME,
    });
    if (existing) return;
    const hashedPassword = await bcrypt.hash(
      process.env.SUPERADMIN_PASSWORD,
      12
    );

    const superadmin = new Staff({
      first_name: process.env.SUPERADMIN_FIRSTNAME,
      last_name: process.env.SUPERADMIN_LASTNAME,
      username: process.env.SUPERADMIN_USERNAME,
      password: hashedPassword,
      role: "superadmin",
      position: "Super admin",
      phone: "+998999999009",
      address: "USA",
    });
    await superadmin.save();
  } catch (error) {
    console.error("Error creating superadmin:", error.message);
    process.exit(1);
  }
};
export default createSuperAdmin;
