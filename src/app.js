import express from "express";
import reservationRoutes from "./routes/reservationRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

const app = express();

app.use(express.json());

app.use("/reservations", reservationRoutes);
app.use("/reservations", eventRoutes);

export default app;
