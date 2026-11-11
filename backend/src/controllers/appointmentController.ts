import { Response } from 'express';
import Appointment from '../models/Appointment.js';
import Pet from '../models/Pet.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

export const createAppointment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { petId, date, timeSlot, reason, vetId } = req.body;

    if (!req.user) {
      res.status(401).json({ message: 'User not authorized' });
      return;
    }

    const pet = await Pet.findById(petId);
    if (!pet) {
      res.status(404).json({ message: 'Pet not found' });
      return;
    }

    if (pet.owner.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: 'You can only book appointments for your own pets' });
      return;
    }

    const appointment = await Appointment.create({
      pet: petId,
      owner: req.user._id,
      vet: vetId || null,
      date,
      timeSlot,
      reason,
      status: 'pending',
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getMyAppointments = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not authorized' });
      return;
    }

    let filter = {};
    if (req.user.role === 'owner') {
      filter = { owner: req.user._id };
    } else if (req.user.role === 'vet') {
      filter = { $or: [{ vet: req.user._id }, { vet: null }] };
    }

    const appointments = await Appointment.find(filter)
      .populate('pet', 'name species breed age weight')
      .populate('owner', 'name email phone')
      .populate('vet', 'name email')
      .sort({ date: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getAppointmentById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('pet', 'name species breed age weight medicalHistory')
      .populate('owner', 'name email phone')
      .populate('vet', 'name email');

    if (!appointment) {
      res.status(404).json({ message: 'Appointment not found' });
      return;
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateAppointmentStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, vetNotes } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      res.status(404).json({ message: 'Appointment not found' });
      return;
    }

    if (status) appointment.status = status;
    if (vetNotes) appointment.vetNotes = vetNotes;
    if (req.user && req.user.role === 'vet') appointment.vet = req.user._id;

    const updated = await appointment.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteAppointment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      res.status(404).json({ message: 'Appointment not found' });
      return;
    }

    if (!req.user || (req.user.role === 'owner' && appointment.owner.toString() !== req.user._id.toString())) {
      res.status(403).json({ message: 'Not authorized to delete this appointment' });
      return;
    }

    await appointment.deleteOne();
    res.status(200).json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};