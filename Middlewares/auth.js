import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const authenticated = async (req, res, next) => {
  const token = req.header("Auth");
  try {
    if (!token) return res.json({ message: "Login First", success: false });

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const id = decoded.userId;
    let user = await User.findById(id);
    if (!user)
      return res.json({ message: "User does not exist", success: false });
    req.user = user;
    next();
  } catch (error) {
    res.json({ message: error.message });
  }
};
