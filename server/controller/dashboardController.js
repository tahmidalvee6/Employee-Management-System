import Employee from "../models/Employee.js";
import Attendance from "../models/Attendance.js";
import LeaveApplication from "../models/LeaveApplication.js";
import Payslip from "../models/Payslip.js";
export const getDashboard = async (req, res) => {
  try {
    const session = req.user;
    if (session.role === "ADMIN") {
      const [totalEmployees, todayAttendance, pendingLeaves] =
        await Promise.all([
          Employee.countDocuments({ isDeleted: { $ne: true } }),
          Attendance.countDocuments({
            date: new Date().toISOString().split("T")[0],
          }),
          LeaveApplication.countDocuments({ status: "PENDING" }),
        ]);
      const payslips = await Payslip.find({}).sort({ createdAt: -1 }).limit(10);

      return res.json({
        totalEmployees,
        todayAttendance,
        pendingLeaves,
        totalPayslips: payslips.length,
      });
    } else {
      const employee = await Employee.findOne({
        userId: session.userId,
      }).lean();
      if (!employee)
        return res.status(404).json({ error: "Employee not found" });

      const [todayAttendance, leaves, payslip] = await Promise.all([
        Attendance.findOne({
          employeeId: employee._id,
          date: new Date().toISOString().split("T")[0],
        }),
        LeaveApplication.countDocuments({
            employeeId: employee._id,
            status: "PENDING",
          }),
          Payslip
            .findOne({ employeeId: employee._id })
            .sort({
              createdAt: -1,
            }),
        ]);

      return res.json({
        totalEmployees: 1,
        todayAttendance: todayAttendance ? 1 : 0,
        pendingLeaves: leaves,
        totalPayslips: payslip ? 1 : 0,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};