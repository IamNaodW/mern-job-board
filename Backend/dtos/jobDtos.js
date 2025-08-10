import Joi from 'joi';

export const createJobSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).required(),
  company: Joi.string().min(2).max(100).required(),
  location: Joi.string().min(2).max(100).required(),
  salary: Joi.number().min(0),
  skillsRequired: Joi.array().items(Joi.string()).required(),
});

export const updateJobSchema = Joi.object({
  title: Joi.string().min(2).max(100),
  description: Joi.string().min(10),
  company: Joi.string().min(2).max(100),
  location: Joi.string().min(2).max(100),
  salary: Joi.number().min(0),
  skillsRequired: Joi.array().items(Joi.string()),
});
