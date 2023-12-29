import { MongooseError } from "mongoose";

export const handleSaveError = (error, _, next) => {
  const { name, code } = error;
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
};
