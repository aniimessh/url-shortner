import express from "express";
import urlRoutes from "./routes/url.routes";
import authRoutes from "./routes/user.routes";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config({
  quiet: true,
});

const app = express();

// middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/url", urlRoutes);

export default app;
