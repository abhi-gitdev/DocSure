// authUser.js
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers; // Or use Authorization: Bearer <token>
    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized, login again",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ attach to req, not req.body
    req.userId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
