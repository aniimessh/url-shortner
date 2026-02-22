import express from "express";
import {
  createShortUrl,
  redirectToLongUrl,
} from "../controllers/url.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = express.Router();

router.post("/create-short-url", authMiddleware, createShortUrl);
router.get("/:shortUrl", authMiddleware, redirectToLongUrl);

export default router;
