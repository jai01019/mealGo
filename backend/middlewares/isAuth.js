import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(req.cookies)
console.log("token",token)
    if (!token) {
      return res.status(404).json({
        message: "token not found",
      });
    }
    const decode =  jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(404).json({
        message: "decode not found",
      });
    }
    console.log("the value of decode is :", decode);

    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log("error during is Auth is:", error.message);
    return res.status(500).json({
      message: "Internal server error ",
    });
  }
};
