import express from "express";
import dotenv from "dotenv";
import healthRoutes from "./routes/healthRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import logger from "./config/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { authHandler } from "./middleware/authHandler.js";
import { adminOnlyHandler } from "./middleware/adminOnlyHandler.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import showingRoutes from "./routes/showingRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4002;

app.use("/", express.json());

app.use("/health", healthRoutes);
app.use("/movies", authHandler, adminOnlyHandler, movieRoutes);
app.use("/users", userRoutes);
app.use("/reservations", authHandler, reservationRoutes);
app.use("/showings", showingRoutes);

app.use(errorHandler);

// app.use("/");
try {
  app.listen(PORT, () => logger.info(`Server has been started ${PORT}`));
} catch (err) {
  logger.info(err);
}

export default app;
