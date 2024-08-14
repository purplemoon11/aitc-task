import Joi from "joi";

/**
 * Registration validator
 */
export const registrationSchema = Joi.object({
  name: Joi.string().max(200).required(),
  email: Joi.string().email().max(100).required(),
  phone: Joi.string().length(10).required(),
  userName: Joi.string().max(30).required(),
  password: Joi.string().min(6).required(),
});

/**
 *  Login validator
 */
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
