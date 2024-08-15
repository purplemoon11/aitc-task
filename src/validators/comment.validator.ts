import Joi from "joi";

/**
 * Comment validator when adding comment
 */
export const addCommentSchema = Joi.object({
  content: Joi.string().min(1).max(1000).required().messages({
    "string.base": "Content must be a string",
    "string.empty": "Content cannot be empty",
    "string.min": "Content must be at least 1 character long",
    "string.max": "Content must be less than or equal to 1000 characters",
    "any.required": "Content is required",
  }),
});
