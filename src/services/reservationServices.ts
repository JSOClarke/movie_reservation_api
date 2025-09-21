import pool from "../config/db.js";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const addBooking = async ({ user_id, show_id, seat_id }) => {
  const response = await prisma.bookings.create({
    data: {
      user_id: user_id,
      show_id: show_id,
      seat_id: seat_id,
    },
    select: {
      booking_id: true,
    },
  });
  return response;
};
