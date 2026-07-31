import Employee from "../models/Employee.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const getEmployees = async (req, res) => {
    try {
        const { department, status } = req.query;
        const where = { isDeleted: false };
        if (department) where.department = department;

        const employees = await Employee.find(where).sort({ createdAt: -1 }).populate("userId", "email role").lean();
        return res.json(employees);
    } catch (error) {
        console.error("Error getting employees:", error);
        return res.status(500).json({ error: error.message });
    }
};

export const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id).populate("userId", "email role").lean();
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        return res.json(employee);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const createEmployee = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, position, department, basicSalary, allowance, deduction, joinDate, bio, role, password } = req.body;
        const hashedPassword = await bcrypt.hash(password || "123123", 10);

        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashed, role : role|| 'EMPLOYEE'  });

        try {
            const employee = await Employee.create({
                userId: newUser._id,
                firstName,
                lastName,
                email,
                phone,
                position,
                department : department || "Operations",
                basicSalary : Number(basicSalary) || 0,
                allowances : Number(allowance) || 0,
                deductions : Number(deduction) || 0,
                joinDate :  new Date(joinDate),
                bio : bio || ""
            });
                
            return res.status(201).json({ success: true, employee });
        } catch (employeeError) {
            await User.findByIdAndDelete(newUser._id);
            console.error("Error creating employee after user creation:", employeeError);
            if (employeeError.name === "ValidationError") {
                return res.status(400).json({ error: `Invalid employee data: ${Object.values(employeeError.errors).map(e => e.message).join(", ")}` });
            }
            return res.status(500).json({ error: "Failed to create employee. User rollback successful." });
        }


    } catch (error) {
       if (error.code === 11000) {
            return res.status(400).json({ error: "Email already exists" });
       }
       console.error("Error creating employee:", error);
       return res.status(500).json({ error: "Failed to create employee" });
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phone, position, department, basicSalary, allowance, deduction, joinDate, bio, employeeStatus } = req.body;

        const employee = await Employee.findByIdAndUpdate(
            id,
            {
                firstName,
                lastName,
                email,
                phone,
                position,
                department : department || "Operations",
                basicSalary : Number(basicSalary) || 0,
                allowances : Number(allowance) || 0,
                deductions : Number(deduction) || 0,
                joinDate : new Date(joinDate),
                bio,
                employeeStatus
            },
            { new: true, runValidators: true }
        );
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        return res.json({ success: true, employee });
    } catch (error) {
        console.error("Error updating employee:", error);
        if (error.code === 11000) {
            return res.status(400).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: error.message });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndDelete(id);

        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        await User.findByIdAndDelete(employee.userId);

        return res.json({ success: true, message: "Employee deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Failed to delete employee" });
    }
};