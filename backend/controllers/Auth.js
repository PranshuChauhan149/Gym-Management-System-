import genToken from "../config/token.js";
import admin from "../models/Admin.js";
import bcrypt from 'bcrypt';

// ✅ SignUp Controller
export const SignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const findWithEmail = await admin.findOne({ email });
    if (findWithEmail) {
      return res.json({ success: false, message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await admin.create({
      username,
      email,
      password: hashPassword,
    });

    const token = await genToken(user._id);

    // ✅ Deployment-ready Cookie Settings
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
      sameSite: "None",                 // ✅ For cross-site cookies
      secure: true,                     // ✅ Must be true for HTTPS
    });

    return res.json({ success: true, message: "Account created successfully" });

  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

// ✅ Login Controller
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const user = await admin.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Email incorrect" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.json({ success: false, message: "Password incorrect" });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "None",   // ✅ Must be 'None' for cross-domain
      secure: true,       // ✅ Must be true on HTTPS
    });

    return res.json({ success: true,user });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ✅ Logout Controller
export const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      sameSite: "None",  // ✅ Make sure to clear the correct cookie
      secure: true,      // ✅ Must match the cookie's original options
    });

    return res.json({ success: true, message: "Logout successfully" });

  } catch (error) {
    return res.json({ success: false, message: "Logout error" });
  }
};
