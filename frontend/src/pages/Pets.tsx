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
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="text-xs font-semibold tracking-widest text-teal-400 uppercase bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
            Profile Registry
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-3">Registered Pets</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-xl h-fit">
            <h2 className="text-xl font-bold mb-6 text-white">Enroll New Pet</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Pet Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Bella"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-800/60 border border-slate-700/80 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Species
                  </label>
                  <select
                    name="species"
                    value={formData.species}
                    onChange={handleChange}
                    className="w-full bg-slate-800/60 border border-slate-700/80 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                  >
                    <option value="Dog" className="bg-slate-900 text-white">Dog</option>
                    <option value="Cat" className="bg-slate-900 text-white">Cat</option>
                    <option value="Bird" className="bg-slate-900 text-white">Bird</option>
                    <option value="Other" className="bg-slate-900 text-white">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-slate-800/60 border border-slate-700/80 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                  >
                    <option value="Male" className="bg-slate-900 text-white">Male</option>
                    <option value="Female" className="bg-slate-900 text-white">Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Breed
                </label>
                <input
                  type="text"
                  name="breed"
                  required
                  placeholder="e.g. Golden Retriever"
                  value={formData.breed}
                  onChange={handleChange}
                  className="w-full bg-slate-800/60 border border-slate-700/80 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    name="age"
                    min="0"
                    required
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full bg-slate-800/60 border border-slate-700/80 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Weight (KG)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    min="0"
                    required
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full bg-slate-800/60 border border-slate-700/80 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Medical Notes
                </label>
                <textarea
                  name="medicalHistory"
                  rows={2}
                  placeholder="Vaccines, allergies..."
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  className="w-full bg-slate-800/60 border border-slate-700/80 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-bold py-3.5 rounded-xl shadow-lg shadow-teal-500/20 transition duration-200"
              >
                Register Pet Profile
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="text-center py-12 text-slate-500">Loading registered pets...</div>
            ) : pets.length === 0 ? (
              <div className="text-center py-12 bg-slate-900/60 border border-slate-800 rounded-3xl text-slate-400">
                No pets registered yet. Add your first pet!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pets.map((pet: Pet) => (
                  <div key={pet._id} className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-black text-white">{pet.name}</h3>
                        <span className="text-xs bg-teal-500/10 text-teal-400 border border-teal-500/20 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {pet.species}
                        </span>
                      </div>
                      <div className="space-y-1.5 text-sm text-slate-400 mb-6">
                        <p><span className="text-slate-500">Breed:</span> {pet.breed}</p>
                        <p><span className="text-slate-500">Age:</span> {pet.age} yrs | <span className="text-slate-500">Gender:</span> {pet.gender}</p>
                        <p><span className="text-slate-500">Weight:</span> {pet.weight} kg</p>
                        {pet.medicalHistory.length > 0 && (
                          <p className="text-xs text-teal-300 bg-teal-500/5 border border-teal-500/10 p-2.5 rounded-xl mt-3">
                            <span className="text-teal-400 font-semibold">Notes:</span> {pet.medicalHistory.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 flex gap-3">
                      <button
                        onClick={() => setSelectedPetForQr(pet)}
                        className="flex-1 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/30 text-xs font-bold py-2.5 rounded-xl transition"
                      >
                        Collar QR Tag
                      </button>
                      <button
                        onClick={() => dispatch(deletePet(pet._id))}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold px-4 py-2.5 rounded-xl transition"
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
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-sm w-full text-center space-y-5 shadow-2xl">
              <div>
                <span className="text-xs font-semibold tracking-widest text-teal-400 uppercase bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
                  Collar ID Tag
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-2">{selectedPetForQr.name}</h3>
                <p className="text-xs text-slate-400 mt-1">Scan tag to view owner emergency contact</p>
              </div>

              <div className="bg-white p-4 rounded-2xl w-fit mx-auto shadow-xl">
                <QRCodeSVG
                  value={`PET: ${selectedPetForQr.name} | BREED: ${selectedPetForQr.breed} | OWNER: ${user?.name} | EMERGENCY PHONE: ${user?.phone}`}
                  size={180}
                />
              </div>

              <button
                onClick={() => setSelectedPetForQr(null)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 rounded-xl transition"
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