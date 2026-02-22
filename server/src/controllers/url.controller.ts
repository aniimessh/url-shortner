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
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in to access this resource",
      });
    }

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
      userId: user?.id,
    });

    return res.status(201).json({
      success: true,
      message: "Short URL created successfully",
      data: {
        longUrl: longUrl,
        shortUrl: `${process.env.BASE_URL}/${url}`,
        user: user?.id,
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

export const redirectToLongUrl = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const { shortUrl } = req.params;
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in to access this resource",
      });
    }

    const urlData = await UrlModel.findOne({ shortUrl });

    if (!urlData) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found",
      });
    }

    if (!urlData.userId || urlData.userId.toString() !== user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You are not the owner of this URL",
      });
    }

    //  Update click count BEFORE redirecting
    await UrlModel.findOneAndUpdate(
      { shortUrl },
      { $inc: { clickCount: 1 } }, // atomic increment, safer than manual count
    );


    return res.redirect(urlData.longUrl as string);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: message,
    });
  }
};
