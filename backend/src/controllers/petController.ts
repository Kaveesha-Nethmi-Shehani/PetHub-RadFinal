import { Response } from 'express';
import Pet from '../models/Pet.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

export const createPet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, species, breed, age, weight, gender, medicalHistory } = req.body;

    if (!req.user) {
      res.status(401).json({ message: 'User not authorized' });
      return;
    }

    const pet = await Pet.create({
      owner: req.user._id,
      name,
      species,
      breed,
      age,
      weight,
      gender,
      medicalHistory: medicalHistory || [],
    });

    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getMyPets = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not authorized' });
      return;
    }

    const pets = await Pet.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getPetById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      res.status(404).json({ message: 'Pet not found' });
      return;
    }

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updatePet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      res.status(404).json({ message: 'Pet not found' });
      return;
    }

    if (!req.user || pet.owner.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: 'Not authorized to update this pet' });
      return;
    }

    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedPet);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deletePet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      res.status(404).json({ message: 'Pet not found' });
      return;
    }

    if (!req.user || pet.owner.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: 'Not authorized to delete this pet' });
      return;
    }

    await pet.deleteOne();
    res.status(200).json({ message: 'Pet removed successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};