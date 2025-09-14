
// filepath: /Users/rudranildatta/Desktop/hack2/backend/src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import busRoutes from "./routes/busRoutes.js";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/buses", busRoutes);

export default app;