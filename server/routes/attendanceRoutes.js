import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { clockIn, getAttendance } from "../controller/attendanceController.js";

const attendanceRouter = Router();

attendanceRouter.post('/', protect, clockIn)
attendanceRouter.get('/', protect, getAttendance)

export default attendanceRouter;
