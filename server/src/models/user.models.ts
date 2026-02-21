import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../interface/user.interface";

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  try {
    // Generate Salt
    const salt = await bcrypt.genSalt(10);

    // Hash Password
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in hashing password");
      console.log(error.message);
    }
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in comparing password");
      console.log(error.message);
    }
  }
};

export const User = mongoose.model<IUser>("user", userSchema);
