// One-time cleanup script.
// Removes Payslip / LeaveApplication / Attendance records whose employeeId
// no longer points to an existing Employee document (leftover from
// employee deletions made before the cascade-delete fix).
//
// Usage (from the server/ directory):
//   node scripts/cleanupOrphanedData.js

import "dotenv/config";
import mongoose from "mongoose";
import Employee from "../models/Employee.js";
import Payslip from "../models/Payslip.js";
import LeaveApplication from "../models/LeaveApplication.js";
import Attendance from "../models/Attendance.js";

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    const existingEmployeeIds = await Employee.find().distinct("_id");

    const [payslipResult, leaveResult, attendanceResult] = await Promise.all([
      Payslip.deleteMany({ employeeId: { $nin: existingEmployeeIds } }),
      LeaveApplication.deleteMany({ employeeId: { $nin: existingEmployeeIds } }),
      Attendance.deleteMany({ employeeId: { $nin: existingEmployeeIds } }),
    ]);

    console.log(`Removed ${payslipResult.deletedCount} orphaned payslip(s)`);
    console.log(`Removed ${leaveResult.deletedCount} orphaned leave application(s)`);
    console.log(`Removed ${attendanceResult.deletedCount} orphaned attendance record(s)`);
  } catch (error) {
    console.error("Cleanup failed:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

run();