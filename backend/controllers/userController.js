import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d' // Token expiration time
    });
}

// routes for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        // Create JWT token
        const token = createToken(user._id);

        // Return success response with user details and token
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
        
    } catch (error) {
        console.error("Error during user login:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }

}

// routes for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Validate email formatting and strong password
        if(!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address"
            });
        }
        if(password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }

        // make password encrypted
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        const token = createToken(user._id);

        // Return success response with user details and token
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
        
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }

}

// route for admin login
const adminLogin = async (req, res) => {

}

export { loginUser, registerUser, adminLogin };