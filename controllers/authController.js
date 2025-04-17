import userModel from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({
        error: true,
        message: "All registration fields are required!",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        error: true,
        message: "User already exists!",
      });
    }

    const user = await userModel.create({
      name,
      email,
      password,
    });

    // create token
    const token = user.createJWT();

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      data: user,
      token,
    });
  } catch (error) {
    console.error("registerError", error);
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        error: true,
        message: "All registration fields are required!",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        error: true,
        message: "User does not exist!",
      });
    }

    // compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send({
        error: true,
        message: "Invalid credentials!",
      });
    }

    // create token
    const token = user.createJWT();

    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      data: user,
      token,
    });
  } catch (error) {
    console.error("registerError", error);
    return res.status(500).json({ error: true, message: error.message });
  }
};
