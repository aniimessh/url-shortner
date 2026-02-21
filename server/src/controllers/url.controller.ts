import { Request, Response } from "express";
import { UrlModel } from "../models/url.model";

// helper function
const generateShortUrl = (): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortUrl = "";

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortUrl += characters[randomIndex];
  }
  return shortUrl;
};

export const createShortUrl = async (req: Request, res: Response) => {
  try {
    const { longUrl } = req.body;

    try {
      new URL(longUrl);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid URL format",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    if (!longUrl) {
      return res.status(400).json({
        success: false,
        message: "Long URL is required",
        method: createShortUrl.name,
      });
    }

    const url = generateShortUrl();

    const newURL = await UrlModel.create({
      longUrl: longUrl,
      shortUrl: url,
    });

    return res.status(201).json({
      success: true,
      message: "Short URL created successfully",
      data: {
        longUrl: longUrl,
        shortUrl: `${process.env.BASE_URL}/${url}`,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
        method: createShortUrl.name,
      });
    }
  }
};

export const redirectToLongUrl = async (req: Request, res: Response) => {
  try {
    const { shortUrl } = req.params;
    const urlData = await UrlModel.findOne({ shortUrl: shortUrl });

    if (!urlData) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found",
        method: redirectToLongUrl.name,
      });
    }

    res.redirect(urlData.longUrl as string);

    let count = urlData.clickCount ? (urlData.clickCount as number) + 1 : 1;

    await UrlModel.findOneAndUpdate(
      { shortUrl: shortUrl },
      { clickCount: count },
    );
    return;
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
        method: redirectToLongUrl.name,
      });
    }
  }
};
