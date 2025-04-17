import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
// files import
import connectDB from "./config/db.js";
// routes import
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
// middlewares import
import errorMiddleware from "./middlewares/errorMiddleware.js";

// Dot ENV config
dotenv.config();

// mongodb connection
connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);

// validation middleware
app.use(errorMiddleware);

// port 
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.DEV_MODE} Mode on port ${port}`
  );
});
