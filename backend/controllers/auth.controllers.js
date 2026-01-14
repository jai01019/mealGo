import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;
    // 1️⃣ Required field validation
    if (!fullName || !email || !mobile || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exit with this email",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must be at least 6 character.",
      });
    }
    if (String(mobile).length < 10) {
      return res.status(400).json({
        success: false,
        message: "mobile number  atleast 10 digits",
      });
    }
    const saltRounds = Number(process.env.genSalt) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      fullName,
      email,
      mobile,
      role,
      password: hashedPassword,
    });
    await newUser.save();


    let token =await genToken(newUser._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(201).json({
      success: true,
      message: "user created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log("error during the user create is", error);
    res.status(500).json({
      success: false,
      message:"internal server error "
    });
  }
};



export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1️⃣ Required field validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: " are required",
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user did not found",
      });
    }

    //const saltRounds = Number(process.env.genSalt) || 10;
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Password did not match",
      });
    }

    const token =await genToken(user._id);

    console.log("Generated token type:", typeof token);
console.log("Generated token:", token);
console.log("User ID:", user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json({
      success: true,
      message: "user signIn successfully",
      user: user,
    });
  } catch (error) {
    console.log("error during the user signIn is", error);
    res.status(500).json({
      success: false,
    });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "user signOut successfully",
    });
  } catch (error) {
    console.log("error during the user signOut is", error);
    res.status(500).json({
      success: false,
    });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exit in the databases",
      });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;

    user.isOtpVerified = false;

    await user.save();
    await sendOtpMail(email, otp);
    return res.status(200).json({
      success: true,
      message: "email and otp sended successfully",
    });
  } catch (error) {
    console.log(`error is during sending the otp:`, error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if OTP expired
    if (!user.otpExpires || user.otpExpires < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired" });
    }

    // Check if OTP matches
    if (user.resetOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;

    await user.save();
    res.status(200).json({
      success: true,
      message: "Otp verified successfully",
    });
  } catch (error) {
    console.log("the error during the otp verify is:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    console.log("user found for reset password:", user);
    // Ensure OTP was verified
    if (user.isOtpVerified !== true) {
      return res.status(400).json({
        success: false,
        message: "OTP not verified. Please verify first.",
      });
    }
    console.log("process.env genSalt:", process.env.genSalt);
    const saltRounds = Number(process.env.genSalt) || 10;
    console.log("saltRounds:", saltRounds);

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user.password = hashedPassword;
    user.isOtpVerified = undefined;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();
    res.status(200).json({
      success: true,
      message: "password reset  successfully",
    });
  } catch (error) {
    console.log("the error during the reset password is:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { fullName, email, mobile, role } = req.body;
    // if (!fullName || !email || !mobile || !role) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "All fields are required",
    //   });
    // }

    let user = await User.findOne({ email });

    if (!user) {
      user =await User.create({
        fullName,
        email,
        mobile,
        role,
password: await bcrypt.hash("GOOGLE_AUTH", 10)      });
    }
    const token =await genToken(user._id);
console.log("Generated token type:", typeof token);
console.log("Generated token:", token);
console.log("User ID:", user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(201).json({
      success: true,
      message: "user created successfully",
      user,
    });
  } catch (error) {
    console.log("error during the google auth is :", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
