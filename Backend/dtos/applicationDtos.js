import Joi from 'joi';

export const applyJobSchema = Joi.object({
  coverLetter: Joi.string().min(10).required(),
  // resume will be handled by multer upload, so no validation here
});
