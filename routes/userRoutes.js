import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { updateUser } from "../controllers/userController.js";

const router = express.Router();

router.route("/update-user").put(userAuth, updateUser);

export default router;
