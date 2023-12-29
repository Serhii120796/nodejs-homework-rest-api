import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleSaveError } from "./hooks.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: String,
    phone: String,
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleSaveError);

contactSchema.post("findOneAndUpdate", handleSaveError);

const message = { "any.required": "missing required field" };

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages(message),
  email: Joi.string().required().messages(message),
  phone: Joi.string().required().messages(message),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

export const contactsUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

export default Contact;
