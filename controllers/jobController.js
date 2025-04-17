import jobModel from "../models/jobModel.js";

export const createJob = async (req, res) => {
  try {
    const { company, position } = req.body;

    if (!company || !position) {
      return res.status(400).send({
        error: true,
        message: "Please provide all fields!",
      });
    }
    req.body.createdBy = req.user.userId;

    const job = await jobModel.create(req.body);

    return res.status(201).send({
      success: true,
      message: "Job created successfully!",
      job,
    });
  } catch (error) {
    console.error("registerError", error);
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await jobModel.find({ createdBy: req.user.userId });
    return res.status(200).send({
      success: true,
      totalJobs: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("registerError", error);
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const getDetailJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await jobModel.findById(id);
    return res.status(200).send({
      success: true,
      job,
    });
  } catch (error) {
    console.error("registerError", error);
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const { company, position } = req.body;

    if (!company || !position) {
      return res.status(400).send({
        error: true,
        message: "Please provide all fields!",
      });
    }

    const job = await jobModel.findOne({ _id: id });

    if (!job) {
      return res.status(400).send({
        error: true,
        message: `No job found with this id ${id}!`,
      });
    }

    if (req.user.userId !== job.createdBy.toString()) {
      return res.status(400).send({
        error: true,
        message: "You are not authorized to update this job!",
      });
    }

    const updateJob = await jobModel.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).send({
      success: true,
      updateJob,
    });
  } catch (error) {
    console.error("registerError", error);
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await jobModel.findOne({ _id: id });

    if (!job) {
      return res.status(400).send({
        error: true,
        message: `No job found with this id ${id}!`,
      });
    }

    if (req.user.userId !== job.createdBy.toString()) {
      return res.status(400).send({
        error: true,
        message: "You are not authorized to update this job!",
      });
    }

    await job.deleteOne();

    return res.status(200).send({
      success: true,
      message: "Job deleted successfully!",
    });
  } catch (error) {
    console.error("registerError", error);
    return res.status(500).json({ error: true, message: error.message });
  }
};
