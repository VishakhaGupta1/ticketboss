import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  reservationId: String,
  partnerId: String,
  seats: Number,
  status: String
});

export const Reservation = mongoose.model("Reservation", reservationSchema);
