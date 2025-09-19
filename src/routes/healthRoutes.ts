import express from "express";
import * as healthController from "../controllers/healthControllers.js";

const routes = express.Router();

routes.get("/", healthController.healthCheckServer);

export default routes;
