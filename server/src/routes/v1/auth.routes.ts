import express from 'express';
import {
  signupSchema,
  loginSchema,
} from '@src/validation/yup/schemas/user.schema';
import {
  signup,
  signupWithEmailVerification,
  activateAccount,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  logoutCookie,
  getCurrentUser,
} from '@src/controllers/auth.controllers';
import validationRequest from '@src/validation/yup/middlewares/yup.validation.middleware';
import userRoutes from './user.routes';
import { authenticate } from '@src/middlewares/auth.middlewares';

const router = express.Router();

router.post('/signup', validationRequest(signupSchema), signup);

router.post(
  '/signup-with-email-verification',
  validationRequest(signupSchema),
  signupWithEmailVerification
);
router.post('/activate-account', activateAccount);
router.post('/create-business', validationRequest(signupSchema), signup);
router.post('/login', validationRequest(loginSchema), login);

router.use('/current-user', authenticate, getCurrentUser);

router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);
router.patch('/change-password', changePassword);
router.get('/logout', logoutCookie);

export default router;
