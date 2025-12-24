import app from "./app.js";
import { connectDB } from "./db.js";
import { Event } from "./models/Event.js";

await connectDB();

const existing = await Event.findOne({ eventId: "node-meetup-2025" });

if (!existing) {
  await Event.create({
    eventId: "node-meetup-2025",
    name: "Node.js Meet-up",
    totalSeats: 500,
    availableSeats: 500,
    version: 0
  });

  console.log("Event Seeded 🎉");
}

const PORT = 3000;

app.listen(PORT, () => console.log(`TicketBoss Running on ${PORT}`));
