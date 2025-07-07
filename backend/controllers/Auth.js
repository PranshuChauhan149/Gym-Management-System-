import genToken from "../config/token.js";
import admin from "../models/Admin.js";
import bcrypt from 'bcrypt';

// ✅ SignUp Controller
export const SignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await admin.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
      sameSite: "None",
      secure: true
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: { _id: user._id, username: user.username, email: user.email }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Login Controller
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await admin.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: { _id: user._id, username: user.username, email: user.email }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Logout Controller
export const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true
    });

    return res.status(200).json({ success: true, message: "Logout successful" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Logout error" });
  }
};
