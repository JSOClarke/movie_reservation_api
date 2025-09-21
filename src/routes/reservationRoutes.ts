import express from "express";
import { createBooking } from "../controllers/reservationControllers.js";

const routes = express.Router();

routes.post("/", createBooking);

export default routes;
