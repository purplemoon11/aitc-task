import Joi from "joi";

/**
 * Comment validator when adding comment
 */
export const addCommentSchema = Joi.object({
  eventId: Joi.number().integer().positive().required().messages({
    "number.base": "Event ID must be a number",
    "number.integer": "Event ID must be an integer",
    "number.positive": "Event ID must be a positive number",
    "any.required": "Event ID is required",
  }),
  content: Joi.string().min(1).max(1000).required().messages({
    "string.base": "Content must be a string",
    "string.empty": "Content cannot be empty",
    "string.min": "Content must be at least 1 character long",
    "string.max": "Content must be less than or equal to 1000 characters",
    "any.required": "Content is required",
  }),
});
