import { AuthService } from "../service/auth.service.js";

export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }
  async loginStaff(req, res) {
    try {
      const { username, password } = req.body;
      console.log(req.body);
      
      const result = await this.authService.loginStaff(username, password);
      res.json({ success: true, ...result });
    } catch (err) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  async loginStudent(req, res) {
    try {
      const { username, password } = req.body;
      const result = await this.authService.loginStudent(username, password);
      res.json({ success: true, ...result });
    } catch (err) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  async registerStaff(req, res, next) {
    try {
      const staff = await this.authService.registerStaff(req.body);
      res.status(201).json({ message: "Staff created", staff });
    } catch (err) {
      next(err);
    }
  }

  async registerStudent(req, res, next) {
    try {
      const student = await this.authService.registerStudent(req.body);
      res.status(201).json({ message: "Student created", student });
    } catch (err) {
      next(err);
    }
  }
}
