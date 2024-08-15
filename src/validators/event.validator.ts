import Joi from "joi";

/**
 * Event validator while creating event
 */

const timePattern = /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/;

export const createEventSchema = Joi.object({
  title: Joi.string().max(200).required(),
  description: Joi.string().required(),
  date: Joi.date().iso().required(),
  time: Joi.string().pattern(timePattern).required(),
  location: Joi.string().max(255).required(),
  image: Joi.string().optional(),
  category: Joi.string().max(50).required(),
});
