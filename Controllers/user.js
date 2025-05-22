import { User } from "../Models/User.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.create({ name, email, password });
    res.json({
      message: "User registered successfully....",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};
