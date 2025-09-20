import express from "express";
import * as movieControllers from "../controllers/movieControllers.js";

const routes = express.Router();

routes.get("/", movieControllers.getMoviesAll);
routes.post("/", movieControllers.addMovie);
routes.delete("/:movie_id", movieControllers.removeMovie);
routes.post("/showings", movieControllers.addShowings);

export default routes;
