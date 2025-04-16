import express from "express";
import "dotenv/config.js";
import connectDB from "./config/db.js";
import Routes from "./routes/routes.js";
import createSuperAdmin from "./script/create.Superadmin.js";
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json())

app.use("/api",Routes())

const initApp = async () => {
  try {
    await connectDB();
    await createSuperAdmin()
    app.listen(PORT, () => {
      console.log("server is running at port:", PORT);
    });
  } catch (error) {
    console.log(error.message, "server ulanishda hatolik yuz berdi");
  }
};
initApp();
