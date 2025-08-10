import express from 'express';
import { register, login } from '../controllers/authController.js';
import { registerSchema, loginSchema } from '../dtos/authDtos.js';
import { validateDto } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/register', validateDto(registerSchema), register);
router.post('/login', validateDto(loginSchema), login);

export default router;
