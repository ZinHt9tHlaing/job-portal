import userModel from "../models/userModel.js";

export const updateUser = async (req, res) => {
  try {
    const { name, lastName, email, password, location } = req.body;
    if (!name || !lastName || !email || !password || !location) {
      return res.status(400).send({
        error: true,
        message: "All fields are required!",
      });
    }

    const user = await userModel.findOne({ _id: req.user.userId });
    if (!user) {
      return res.status(400).send({
        error: true,
        message: "User does not exist!",
      });
    }

    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    user.location = location;

    console.log("user", user);

    await user.save();

    // create token
    const token = user.createJWT();

    return res.status(200).send({
      success: true,
      message: "User updated successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("registerError", error);
    return res.status(500).json({ error: true, message: error.message });
  }
};
