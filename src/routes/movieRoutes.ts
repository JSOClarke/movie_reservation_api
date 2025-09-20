import express from "express";
import * as movieControllers from "../controllers/movieControllers.js";

const routes = express.Router();

routes.get("/", movieControllers.getMoviesAll);

export default routes;
