import express from "express";
import { Event } from "../models/Event.js";
import { Reservation } from "../models/Reservation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const event = await Event.findOne({ eventId: "node-meetup-2025" });

  const count = await Reservation.countDocuments({ status: "confirmed" });

  res.json({
    eventId: event.eventId,
    name: event.name,
    totalSeats: event.totalSeats,
    availableSeats: event.availableSeats,
    reservationCount: count,
    version: event.version
  });
});

export default router;
