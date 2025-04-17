import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { createJob, deleteJob, getDetailJob, getJobs, updateJob } from "../controllers/jobController.js";

const router = express.Router();

router.route("/create-job").post(userAuth, createJob);

router.route("/get-jobs").get(userAuth, getJobs);

router.route("/get-job/:id").get(userAuth, getDetailJob);

router.route("/update-job/:id").patch(userAuth, updateJob);

router.route("/delete-job/:id").delete(userAuth, deleteJob);

export default router;
