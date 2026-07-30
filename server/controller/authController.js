import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { auth as firebaseAuth } from "../config/firebase.js";

// Login for employee and admin
// POST /api/auth/login

export const login = async (req, res) => {
    try {
        const { email, password, role_type, firebaseToken } = req.body;

        if (!email || !role_type) {
            return res.status(400).json({ error: "Please provide email and role" });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "User not found in the system" });
        }

        if (role_type === "admin" && user.role !== "ADMIN") {
            return res.status(403).json({ error: "Access denied. Not an admin." });
        }

        if (role_type === "employee" && user.role !== "EMPLOYEE") {
            return res.status(401).json({ error: "Access denied. Not an employee." });
        }

        let verifiedEmail = email;

        if (firebaseToken) {
            if (!firebaseAuth) {
                return res.status(500).json({ error: "Firebase Admin is not configured on the server" });
            }

            const decoded = await firebaseAuth.verifyIdToken(firebaseToken);
            verifiedEmail = decoded.email || email;

            if (verifiedEmail.toLowerCase() !== email.toLowerCase()) {
                return res.status(401).json({ error: "Firebase email does not match the provided email" });
            }
        } else if (!password) {
            return res.status(400).json({ error: "Please provide password or Firebase token" });
        } else {
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return res.status(401).json({ error: "Invalid email or password" });
            }
        }

        const payload = {
            userId: user._id.toString(),
            role: user.role,
            email: user.email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.json({ user: payload, token });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Login failed" });
    }
};


// Get session for employee and admin

// GET /api/auth/session

export const session = async (req, res) => {
    const session = req.user;
    return res.json({ user: session });

};


// Change password for employee and admin

// POST /api/auth/change-password   

export const changePassword = async (req, res) => {
    try {
        const session = req.user;
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: "Please provide current and new password" });
        }
        const user = await User.findById(session.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) {
            return res.status(401).json({ error: "Current password is incorrect" });
        }
        const hashed = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(session.userId, { password: hashed });
        return res.json({ success: true });

    }
    catch (error) {
        return res.status(500).json({ error: "Password change failed" });
    }
};
