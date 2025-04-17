import express from "express";
import { testPostController } from "../controllers/testController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/test").post(userAuth, testPostController);

export default router;
