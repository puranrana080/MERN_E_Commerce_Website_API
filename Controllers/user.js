import { User } from "../Models/User.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await user.findOne({ email });
    if (user)
      return res.json({ message: "User already available", success: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });
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
