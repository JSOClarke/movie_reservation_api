import express from "express";
import dotenv from "dotenv";
import healthRoutes from "./routes/healthRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import logger from "./config/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
dotenv.config();

const app = express();

app.use("/", express.json());

app.use("/health", healthRoutes);
app.use("/movies", movieRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

// app.use("/");

app.listen(process.env.PORT, () =>
  logger.info(`Server has been started ${process.env.PORT}`)
);
export default app;
