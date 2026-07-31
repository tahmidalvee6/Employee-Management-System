import Payslip from "../models/Payslip.js";
import Employee from "../models/Employee.js";

export const createPayslip = async (req, res) => {
    try {
        const { employeeId, month } = req.body;
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        const [year, monthNumber] = month.split('-');
        const payslip = await Payslip.create({
            employeeId,
            month: new Date(year, monthNumber - 1),
            basicSalary: employee.basicSalary,
            allowances: employee.allowances,
            deductions: employee.deductions,
            netSalary: employee.basicSalary + employee.allowances - employee.deductions,
        });

        return res.status(201).json({ success: true, payslip });
    } catch (error) {
        console.error("Error creating payslip:", error);
        return res.status(500).json({ error: "Failed to create payslip" });
    }
}

export const getPayslips = async (req, res) => {
    try {
        const session = req.user;
        const isAdmin = session.role == "ADMIN";
        if (isAdmin) {
            const payslips = await Payslip.find().populate("employeeId").sort({ createdAt: -1 });
            return res.json(payslips);
        } else {
            const employee = await Employee.findOne({ userId: session.userId });
            if (!employee) return res.status(404).json({ error: "Employee not found" });
            const payslips = await Payslip.find({ employeeId: employee._id }).sort({ createdAt: -1 });
            return res.json(payslips);
        }
    } catch (error) {
        console.error("Error fetching payslips:", error);
        return res.status(500).json({ error: "Failed to fetch payslips" });
    }
}

export const getPayslipById = async (req, res) => {
    try {
        const { id } = req.params;
        const payslip = await Payslip.findById(id).populate("employeeId");

        if (!payslip) {
            return res.status(404).json({ error: "Payslip not found" });
        }

        return res.json(payslip);
    } catch (error) {
        console.error("Error fetching payslip:", error);
        return res.status(500).json({ error: "Failed to fetch payslip" });
    }
}
