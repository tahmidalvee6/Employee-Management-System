import { DEPARTMENTS } from "../constants/departments.js";
import Employee from "../models/Employee.js";
import Attendance from "../models/Attendance.js";
import LeaveApplication from "../models/LeaveApplication.js";
import Payslip from "../models/Payslip.js";
export const getDashboard = async (requestAnimationFrame, res) => {
  try {
    const session = req.session;
    if (session.role === "Admin") {
      const [totalEmployees, todayAttendance, pendingLeaves] =
        await Promise.all([
          Employee.countDocuments({ isDeleted: { $ne: true } }),
          Attendance.countDocuments({
            date: {
              $gte: new Date(new Date().setHours(0, 0, 0, 0)),
              $lt: new Date(new Date().setHours(24, 0, 0, 0)),
            },
          }),
          LeaveApplication.countDocuments({ status: "PENDING" }),
        ]);
      return res.json({
        role: "ADMIN",
        totalEmployees,
        totalDepartments: DEPARTMENTS.length,
        todayAttendance,
        pendingLeaves,
      });
    } else {
      const employee = await Employee.findOne({
        userid: session.userId,
      }).lean();
      if (!employee)
        return res.status(404).json({ error: "Employee not found" });

      const today = new Date();
      const [currentMonthAttendance, pendingLeaves, lastestPayslip] =
        await Promise.all([
          Attendance.countDocuments({
            employeeId: employee._id,
            date: {
              $gte: new Date(today.getFullYear(), today.getMonth(), 1),
              $lt: new Date(today.getFullYear(), today.getMonth(), +1, 1),
            },
          }),
          LeaveApplication.countDocuments({
            employeeId: employee._id,
            status: "PENDING",
          }),
          payslip
            .findOne({ employeeId: employee._id })
            .sort({
              createdAt: -1,
            })
            .lean(),
        ]);
      return res.json({
        role: "EMPLOYEE",
        employee: { ...employee, id: employee._id.toString() },
        currentMonthAttendance,
        pendingLeaves,
        lastestPayslip: lastestPayslip
          ? { ...lastestPayslip, id: lastestPayslip._id.toString() }
          : null,
      });
    }
  } catch (error) {
    console.error("Dashboard error:", error);
    return res.status(500).json({ error: "Failed" });
  }
};
