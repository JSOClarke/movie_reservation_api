import express from "express";
import { listShowings } from "../controllers/showingControllers.js";

const routes = express.Router();

routes.get("/", listShowings);

export default routes;
