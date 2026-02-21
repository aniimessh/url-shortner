import express from "express";
import {
  createShortUrl,
  redirectToLongUrl,
} from "../controllers/url.controller";
const router = express.Router();

router.post("/create-short-url", createShortUrl);
router.get("/:shortUrl", redirectToLongUrl);
router.get("/", (req, res) => {
  return res.redirect(
    "https://documenter.getpostman.com/view/29075585/2sBXcEkLCX",
  );
});

export default router;
