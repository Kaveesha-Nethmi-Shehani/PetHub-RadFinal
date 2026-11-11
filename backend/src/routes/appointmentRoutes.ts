import { Router } from 'express';
import {
  createAppointment,
  getMyAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment,
} from '../controllers/appointmentController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/')
  .post(protect, createAppointment)
  .get(protect, getMyAppointments);

router.route('/:id')
  .get(protect, getAppointmentById)
  .put(protect, authorizeRoles('vet', 'admin'), updateAppointmentStatus)
  .delete(protect, deleteAppointment);

export default router;