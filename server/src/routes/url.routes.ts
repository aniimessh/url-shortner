import express from "express";
import {
  createShortUrl,
  redirectToLongUrl,
} from "../controllers/url.controller";
const router = express.Router();

router.post("/create-short-url", createShortUrl);
router.get("/:shortUrl", redirectToLongUrl);

export default router;
