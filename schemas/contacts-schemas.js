import Joi from "joi";

const message = { "any.required": "missing required field: {{#label}}" };

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages(message),
  email: Joi.string().required().messages(message),
  phone: Joi.number().min(10).required().messages(message),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.number(),
});
