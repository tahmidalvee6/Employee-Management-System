import { Router } from "express";
import { protect, protectAdmin } from "../middleware/auth.js";
import { createPayslip, getPayslipById, getPayslip } from "../controller/payslipController.js";

const payslipRouter = Router();

payslipRouter.post("/", protect, protectAdmin, createPayslip)
payslipRouter.get("/", protect, getPayslip)
payslipRouter.get("/:id", protect, getPayslipById)

export default payslipRouter
