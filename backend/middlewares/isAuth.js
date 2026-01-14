// import jwt from "jsonwebtoken";

// export const isAuth = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     console.log(req.cookies)
// console.log("token",token)
//     if (!token) {
//       return res.status(404).json({
//         message: "token not found",
//       });
//     }
//     const decode =  jwt.verify(token, process.env.JWT_SECRET);

//     if (!decode) {
//       return res.status(404).json({
//         message: "decode not found",
//       });
//     }
//     console.log("the value of decode is :", decode);

//     req.userId = decode.userId;
//     next();
//   } catch (error) {
//     console.log("error during is Auth is:", error.message);
//     return res.status(500).json({
//       message: "Internal server error ",
//     });
//   }
// };


// middleware/auth.js 
import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
  // ONLY read from cookies
  const token = req.cookies?.token;

  // Debug log
  console.log("Raw token from cookie:", token);
  console.log("Type of token:", typeof token);

  if (!token) {
    return res.status(401).json({ error: "No token found" });
  }

  // 🔥 CRITICAL: Ensure token is a string
  if (typeof token !== 'string') {
    console.error("Invalid token type:", token);
    return res.status(401).json({ error: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT payload:", decoded);
    req.user = decoded;
    console.log("printing req.user:", req.user.userId);
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};