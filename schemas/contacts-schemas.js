import Joi from "joi";

const message = { "any.required": "missing required field" };

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({ "any.required": "missing required name field" }),
  email: Joi.string().required().messages({ "any.required": "missing required email field" }),
  phone: Joi.number().min(10).required().messages({ "any.required": "missing required phone field" }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.number(),
});
