import { Request, Response } from "express";
import { User } from "../models/user.models";
import jwt from "jsonwebtoken";

export const signupUser = async (
  req: Request,
  res: Response,
): Promise<Response | undefined> => {
  try {
    const { username, email, password } = req.body;

    // validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        method: signupUser.name,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email, username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
        method: signupUser.name,
      });
    }

    // create user
    const user = await User.create({
      username,
      email,
      password,
    });

    //  genarate token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET as string,
    );

    res.cookie("jwtToken", token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
    });

    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };

    // return response
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: userResponse,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
        method: signupUser.name,
      });
    }
  }
};
