import express from "express";
import urlRoutes from "./routes/url.routes";
import authRoutes from "./routes/user.routes";

import dotenv from "dotenv";
dotenv.config({
  quiet: true,
});

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/url", urlRoutes);

export default app;
