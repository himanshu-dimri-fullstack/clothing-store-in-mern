import User from "../models/User.js"
import bcrypt from "bcrypt"
import { handleResponseError } from "../utils/errorUtils.js"
import jwt from "jsonwebtoken"

export const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

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
        return handleResponseError(error, res);
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } })
    }
    catch (error) {
        return handleResponseError(res, error);
    }
}

export const logoutUser = (_, res) => {
    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: True,
            sameSite: "none"
        });

        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ message: "Logout failed" });
    }
};

export const dashboard = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).send("Server Error");
    }
}