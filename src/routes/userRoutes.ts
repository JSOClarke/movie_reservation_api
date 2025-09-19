// import logger from "../config/logger.js";
import express from "express";
import * as userControllers from "../controllers/userControllers.js";

const routes = express.Router();

// routes.post("/login");
routes.post("/signup", userControllers.userSignup);

export default routes;
