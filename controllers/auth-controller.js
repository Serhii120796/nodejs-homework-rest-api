import User from "../models/User.js";
import { HttpError } from "../helpers/HttpError.js";
import { userSignupSchema, userSigninSchema, userUpdateSubscriptionSchema } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const { SECRET_KEY } = process.env;

const signup = async (req, res, next) => {
  try {
    const { error } = userSignupSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
      user: {
        email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { error } = userSigninSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json("");
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};

const updateStatusUser = async (req, res, next) => {
  try {
    const { error } = userUpdateSubscriptionSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true });
    console.log(result);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  signup,
  signin,
  getCurrent,
  logout,
  updateStatusUser,
};
