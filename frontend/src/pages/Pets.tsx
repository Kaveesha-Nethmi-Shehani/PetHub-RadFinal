import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QRCodeSVG } from 'qrcode.react';
import { AppDispatch, RootState } from '../app/store';
import { fetchPets, addPet, deletePet } from '../features/petSlice';
import { Pet } from '../types';

export const Pets: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pets, isLoading } = useSelector((state: RootState) => state.pets);
  const { user } = useSelector((state: RootState) => state.auth);

  const [selectedPetForQr, setSelectedPetForQr] = useState<Pet | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    species: 'Dog' as 'Dog' | 'Cat' | 'Bird' | 'Other',
    breed: '',
    age: 1,
    weight: 5,
    gender: 'Male' as 'Male' | 'Female',
    medicalHistory: '',
  });

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addPet({
        name: formData.name,
        species: formData.species,
        breed: formData.breed,
        age: Number(formData.age),
        weight: Number(formData.weight),
        gender: formData.gender,
        medicalHistory: formData.medicalHistory ? [formData.medicalHistory] : [],
      })
    );
    setFormData({
      name: '',
      species: 'Dog',
      breed: '',
      age: 1,
      weight: 5,
      gender: 'Male',
      medicalHistory: '',
    });
  };

  return (
    <div
      className="min-h-[calc(100vh-5rem)] text-white py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.72), rgba(15, 23, 42, 0.92)), url('https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center sm:text-left">
          <span className="inline-block bg-slate-900/80 text-teal-300 border border-teal-500/40 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-md">
            Profile Registry
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3 drop-shadow">
            Registered Pets
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-slate-900/85 border border-slate-700/80 p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-xl h-fit">
            <h2 className="text-xl font-bold mb-6 text-white border-b border-slate-700/80 pb-3">
              Enroll New Pet
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                  Pet Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Bella"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-800/90 border border-slate-600 text-white placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                    Species
                  </label>
                  <select
                    name="species"
                    value={formData.species}
                    onChange={handleChange}
                    className="w-full bg-slate-800/90 border border-slate-600 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-slate-800/90 border border-slate-600 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                  Breed
                </label>
                <input
                  type="text"
                  name="breed"
                  required
                  placeholder="e.g. Golden Retriever"
                  value={formData.breed}
                  onChange={handleChange}
                  className="w-full bg-slate-800/90 border border-slate-600 text-white placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    name="age"
                    min="0"
                    required
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full bg-slate-800/90 border border-slate-600 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                    Weight (KG)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    min="0"
                    required
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full bg-slate-800/90 border border-slate-600 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                  Medical Notes
                </label>
                <textarea
                  name="medicalHistory"
                  rows={2}
                  placeholder="Vaccines, chronic allergies..."
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  className="w-full bg-slate-800/90 border border-slate-600 text-white placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-extrabold py-3.5 rounded-xl shadow-lg shadow-teal-500/25 transition duration-200"
              >
                Register Pet Profile
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="text-center py-16 text-slate-300 font-medium">Loading registered pets...</div>
            ) : pets.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/80 border border-slate-700/80 rounded-3xl text-slate-300 backdrop-blur-md shadow-xl">
                No pets registered yet. Enroll your first pet profile on the left!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pets.map((pet: Pet) => (
                  <div
                    key={pet._id}
                    className="bg-slate-900/85 border border-slate-700/80 p-6 rounded-3xl shadow-2xl backdrop-blur-md flex flex-col justify-between hover:border-teal-500/50 transition duration-200"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-2xl font-black text-white">{pet.name}</h3>
                        <span className="text-xs bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold px-3 py-1 rounded-full uppercase">
                          {pet.species}
                        </span>
                      </div>
                      <div className="space-y-1.5 text-sm text-slate-300 mb-4 bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/60">
                        <p><span className="text-slate-400 font-medium">Breed:</span> {pet.breed}</p>
                        <p><span className="text-slate-400 font-medium">Age:</span> {pet.age} yrs | <span className="text-slate-400 font-medium">Gender:</span> {pet.gender}</p>
                        <p><span className="text-slate-400 font-medium">Weight:</span> {pet.weight} kg</p>
                        {pet.medicalHistory.length > 0 && (
                          <p className="pt-1 text-xs text-teal-200 border-t border-slate-700/60 mt-1">
                            <span className="font-semibold text-teal-400">Notes:</span> {pet.medicalHistory.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-700/80 flex gap-2.5">
                      <button
                        onClick={() => setSelectedPetForQr(pet)}
                        className="flex-1 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 text-xs font-bold py-2.5 rounded-xl transition shadow-sm"
                      >
                        Collar QR Tag
                      </button>
                      <button
                        onClick={() => dispatch(deletePet(pet._id))}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-bold px-4 py-2.5 rounded-xl transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedPetForQr && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-2xl">
              <span className="inline-block bg-teal-500/20 text-teal-300 border border-teal-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Collar Emergency Tag
              </span>
              <h3 className="text-2xl font-black text-white">{selectedPetForQr.name}</h3>
              <p className="text-xs text-slate-300">Scan using smartphone camera to view owner emergency contact</p>

              <div className="bg-white p-4 rounded-2xl w-fit mx-auto shadow-xl">
                <QRCodeSVG
                  value={`PET: ${selectedPetForQr.name} | BREED: ${selectedPetForQr.breed} | OWNER: ${user?.name} | EMERGENCY CONTACT: ${user?.phone}`}
                  size={180}
                />
              </div>

              <button
                onClick={() => setSelectedPetForQr(null)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl border border-slate-600 transition"
              >
                Close Tag
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};