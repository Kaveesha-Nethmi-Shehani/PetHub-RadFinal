import { Router } from 'express';
import {
  createPet,
  getMyPets,
  getPetById,
  updatePet,
  deletePet,
} from '../controllers/petController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/')
  .post(protect, createPet)
  .get(protect, getMyPets);

router.route('/:id')
  .get(protect, getPetById)
  .put(protect, updatePet)
  .delete(protect, deletePet);

export default router;