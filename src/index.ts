import express from "express";
import urlRoutes from "./routes/url.routes";
import dotenv from "dotenv";
dotenv.config({
  quiet: true,
});

const app = express();

// middleware
app.use(express.json());

// routes
app.use(process.env.API_BASE_URL as string, urlRoutes);

export default app;
