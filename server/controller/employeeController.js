import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";


// Get employee
// GET /api/employees/
export const getEmployees = async (req, res) => {
    try {
        const { department, status } = req.query;
        const where = { isDeleted: false };
        if (department) where.department = department;

        const employees = await Employee.find(where).sort({ createdAt: -1 }).populate("userId", "email role").lean();

        const result = employees.map((emp) => ({
            ...emp,
            id: emp._id.toString(),
            user: emp.userId ? {
                email: emp.userId.email,
                role: emp.userId.role
            } : null
        }));
        return res.json(result);

    } catch (error) {
        return res.status(400).json({ error: "Failed to fetch employees" });

    }
};


// Create employee
// POST /api/employees/
export const createEmployee = async (req, res) => {
    try {
        const {firstName, lastName, email, phone, position, department, basicSalary, allowance, deduction, joinDate, password, role, bio} = req.body;

        if(!email || !firstName || !lastName) {
            return res.status(400).json({ error: "Missing required fields" });
        }

<<<<<<< HEAD
        const hashed = password ? await bcrypt.hash(password, 10) : undefined;
=======
        const hashed = await bcrypt.hash(password, 10);
>>>>>>> dev
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


// Update employee
// PUT /api/employees/:id
export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const {firstName, lastName, email, phone, position, department, basicSalary, allowance, deduction, password, role, bio, employeeStatus} = req.body;

        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        

      await Employee.findByIdAndUpdate(id, {
            userId: employee.userId,
            firstName,
            lastName,
            email,
            phone,
            position,
            department : department || "Operations",
            basicSalary : Number(basicSalary) || 0,
            allowances : Number(allowance) || 0,
            deductions : Number(deduction) || 0,
            employeeStatus : employeeStatus || "ACTIVE",
            bio : bio || ""
        });
        
        
        // Update user record
        const userUpdate = {email} 
        if(role) userUpdate.role = role;
        if(password)   userUpdate.password = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(employee.userId, userUpdate);


        return res.json({ success: true });


    } catch (error) {
       if (error.code === 11000) {
            return res.status(400).json({ error: "Email already exists" });
        }
        
        return res.status(500).json({ error: "Failed to update employee" });
    }
};


// Delete employee
// DELETE /api/employees/:id
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
