import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    longUrl: {
      type: String,
    },
    shortUrl: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);

export const UrlModel = mongoose.model("Url", urlSchema);
