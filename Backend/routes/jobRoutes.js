import express from 'express';
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  searchJobs
} from '../controllers/jobController.js';

import { validateDto } from '../middleware/validationMiddleware.js';
import { createJobSchema, updateJobSchema } from '../dtos/jobDtos.js';
import { verifyToken, verifyEmployer } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getJobs);
router.get('/search', searchJobs);
router.get('/:id', getJobById);
router.post('/', verifyToken, verifyEmployer, validateDto(createJobSchema), createJob);
router.put('/:id', verifyToken, verifyEmployer, validateDto(updateJobSchema), updateJob);
router.delete('/:id', verifyToken, verifyEmployer, deleteJob);

export default router;
