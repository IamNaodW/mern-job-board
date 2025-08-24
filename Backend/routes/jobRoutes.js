import express from 'express';
import { verifyToken, verifyEmployer, verifyJobSeeker } from "../middleware/authMiddleware.js";

import {
  getJobs,
  getJobById,
  getMyJobs,
  createJob,
  updateJob,
  deleteJob,
  searchJobs
} from '../controllers/jobController.js';

import { validateDto } from '../middleware/validationMiddleware.js';
import { createJobSchema, updateJobSchema } from '../dtos/jobDtos.js';

const router = express.Router();

router.get('/', getJobs);
router.get('/search', searchJobs);
router.get('/:id', getJobById);
router.get("/my", verifyToken, getMyJobs);
router.post('/', verifyToken, verifyEmployer, validateDto(createJobSchema), createJob);
router.put('/:id', verifyToken, verifyEmployer, validateDto(updateJobSchema), updateJob);
router.delete('/:id', verifyToken, verifyEmployer, deleteJob);

export default router;
