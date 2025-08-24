import Joi from 'joi';
import mongoose from 'mongoose';

// Helper to validate MongoDB ObjectId
const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const createJobSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).required(),
  company: Joi.string().custom(objectIdValidator).required(), // now must be a valid ObjectId
  location: Joi.string().min(2).max(100).required(),
  salary: Joi.number().min(0),
  skillsRequired: Joi.array().items(Joi.string()).required(),
  deadline: Joi.date(), // optional field from your Job model
});

export const updateJobSchema = Joi.object({
  title: Joi.string().min(2).max(100),
  description: Joi.string().min(10),
  company: Joi.string().custom(objectIdValidator), // optional update
  location: Joi.string().min(2).max(100),
  salary: Joi.number().min(0),
  skillsRequired: Joi.array().items(Joi.string()),
  deadline: Joi.date(),
  status: Joi.string().valid('open', 'closed'), // optional update for status
});
