import { AuthService } from "../service/auth.service.js";

export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }
  async loginStaff(req, res, next) {
    try {
      const { username, password } = req.body;
      console.log(req.body);

      const result = await this.authService.loginStaff(username, password);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async loginStudent(req, res, next) {
    try {
      const { username, password } = req.body;
      const result = await this.authService.loginStudent(username, password);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async registerStaff(req, res, next) {
    try {
      const staff = await this.authService.registerStaff(req.body);
      res.status(201).json({ message: "Staff created", staff });
    } catch (error) {
      next(error);
    }
  }

  async registerStudent(req, res, next) {
    try {
      const student = await this.authService.registerStudent(req.body);
      res.status(201).json({ message: "Student created", student });
    } catch (error) {
      next(error);
    }
  }
}
