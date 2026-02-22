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
    clickCount: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      // required: true,
    },
  },
  { timestamps: true },
);

export const UrlModel = mongoose.model("Url", urlSchema);
