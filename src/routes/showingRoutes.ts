import express from "express";
import {
  listShowings,
  listShowingSeats,
} from "../controllers/showingControllers.js";

const routes = express.Router();

routes.get("/", listShowings);
routes.get("/:show_id", listShowingSeats);

export default routes;
