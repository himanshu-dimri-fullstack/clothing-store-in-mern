import User from "../models/User.js"
import bcrypt from "bcrypt"
import { handleResponseError } from "../utils/errorUtils.js"
import jwt from "jsonwebtoken"

export const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "Email already exist" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, email, password: hashedPassword, role: "user"
        })
        res.status(201).json({
            message: "User created successfully", user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    }
    catch (error) {
        return handleResponseError(res, error);
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).json({ token, user: { id: user._id, email: user.email, role: user.role } })

    }
    catch (error) {
        return handleResponseError(res, error);
    }
}

export const adminDashboard = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).send("Server Error");
    }
}