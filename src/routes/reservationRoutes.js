import express from "express";
import { Event } from "../models/Event.js";
import { Reservation } from "../models/Reservation.js";
import { v4 as uuid } from "uuid";

const router = express.Router();

router.post("/", async (req, res) => {
  const { partnerId, seats } = req.body;

  if (!partnerId || !seats)
    return res.status(400).json({ error: "partnerId & seats required" });

  if (seats <= 0 || seats > 10)
    return res.status(400).json({ error: "Seats must be between 1 and 10" });

  while (true) {
    const event = await Event.findOne({ eventId: "node-meetup-2025" });

    if (!event) return res.status(500).json({ error: "Event missing" });

    if (event.availableSeats < seats)
      return res.status(409).json({ error: "Not enough seats left" });

    const updated = await Event.findOneAndUpdate(
      {
        eventId: "node-meetup-2025",
        version: event.version
      },
      {
        availableSeats: event.availableSeats - seats,
        version: event.version + 1
      },
      { new: true }
    );

    if (updated) {
      const reservation = await Reservation.create({
        reservationId: uuid(),
        partnerId,
        seats,
        status: "confirmed"
      });

      return res.status(201).json({
        reservationId: reservation.reservationId,
        seats,
        status: "confirmed"
      });
    }
  }
});

router.delete("/:reservationId", async (req, res) => {
  const { reservationId } = req.params;

  const reservation = await Reservation.findOne({
    reservationId,
    status: "confirmed"
  });

  if (!reservation) return res.status(404).json({ error: "Not Found" });

  const event = await Event.findOne({ eventId: "node-meetup-2025" });

  await Event.updateOne(
    { eventId: "node-meetup-2025" },
    {
      availableSeats: event.availableSeats + reservation.seats,
      version: event.version + 1
    }
  );

  reservation.status = "cancelled";
  await reservation.save();

  return res.status(204).send();
});

export default router;
