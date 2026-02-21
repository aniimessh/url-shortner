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
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or username already exists",
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
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
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

export const loginUser = async (
  req: Request,
  res: Response,
): Promise<Response | undefined> => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        method: loginUser.name,
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //  genarate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    res.cookie("jwtToken", token, {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    });

    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };

    // return response
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: userResponse,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
        method: loginUser.name,
      });
    }
  }
};
