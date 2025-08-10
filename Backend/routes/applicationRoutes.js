import express from 'express';
import { applyToJob, getApplicants, deleteApplication } from '../controllers/applicationController.js';
import { verifyToken, verifyEmployer, verifyJobSeeker } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import { validateDto } from '../middleware/validationMiddleware.js';
import { applyJobSchema } from '../dtos/applicationDtos.js';

const router = express.Router();

router.post(
  '/jobs/:jobId/apply',
  verifyToken,
  verifyJobSeeker,
  upload.single('resume'),           // expects field name 'resume' in form-data
  validateDto(applyJobSchema),       // make sure validation allows form-data input
  applyToJob
);

router.get('/jobs/:jobId/applicants', verifyToken, verifyEmployer, getApplicants);

router.delete('/:id', verifyToken, verifyEmployer, deleteApplication);

export default router;
