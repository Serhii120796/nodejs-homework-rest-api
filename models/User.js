import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleSaveError } from "./hooks.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.post("findOneAndUpdate", handleSaveError);

export const userSignupSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

export const userSigninSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const userUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const User = model("user", userSchema);

export default User;
