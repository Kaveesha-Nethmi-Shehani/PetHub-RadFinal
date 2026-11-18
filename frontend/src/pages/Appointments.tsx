import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jsPDF } from 'jspdf';
import { AppDispatch, RootState } from '../app/store';
import { fetchAppointments, createAppointment, updateAppointmentStatus, deleteAppointment } from '../features/appointmentSlice';
import { fetchPets } from '../features/petSlice';
import { Pet, User, Appointment } from '../types';

export const Appointments: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { appointments, isLoading } = useSelector((state: RootState) => state.appointments);
  const { pets } = useSelector((state: RootState) => state.pets);
  const { user } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    petId: '',
    date: '',
    timeSlot: '09:00 AM - 10:00 AM',
    reason: '',
  });

  const [statusUpdate, setStatusUpdate] = useState<{ id: string; status: string; vetNotes: string }>({
    id: '',
    status: 'confirmed',
    vetNotes: '',
  });

  useEffect(() => {
    dispatch(fetchAppointments());
    if (user?.role === 'owner') {
      dispatch(fetchPets());
    }
  }, [dispatch, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.petId) return;
    dispatch(createAppointment(formData));
    setFormData({
      petId: '',
      date: '',
      timeSlot: '09:00 AM - 10:00 AM',
      reason: '',
    });
  };

  const handleStatusSubmit = (appointmentId: string) => {
    dispatch(updateAppointmentStatus({
      id: appointmentId,
      status: statusUpdate.status,
      vetNotes: statusUpdate.vetNotes,
    }));
    setStatusUpdate({ id: '', status: 'confirmed', vetNotes: '' });
  };

  const generatePDF = (apt: Appointment) => {
    const doc = new jsPDF();
    const petData = typeof apt.pet === 'object' ? (apt.pet as Pet) : null;
    const ownerData = typeof apt.owner === 'object' ? (apt.owner as User) : null;

    doc.setFontSize(22);
    doc.setTextColor(13, 148, 136);
    doc.text('PetHub Veterinary Care', 20, 20);

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text('Official Appointment & Medical Summary', 20, 28);
    doc.line(20, 32, 190, 32);

    doc.setFontSize(11);
    doc.setTextColor(30);
    doc.text(`Appointment ID: ${apt._id}`, 20, 42);
    doc.text(`Date: ${new Date(apt.date).toLocaleDateString()}`, 20, 50);
    doc.text(`Time Slot: ${apt.timeSlot}`, 20, 58);
    doc.text(`Status: ${apt.status.toUpperCase()}`, 20, 66);

    doc.line(20, 72, 190, 72);
    doc.setFontSize(14);
    doc.setTextColor(13, 148, 136);
    doc.text('Pet Information', 20, 82);

    doc.setFontSize(11);
    doc.setTextColor(30);
    doc.text(`Pet Name: ${petData?.name || 'N/A'}`, 20, 90);
    doc.text(`Species: ${petData?.species || 'N/A'}`, 20, 98);
    doc.text(`Breed: ${petData?.breed || 'N/A'}`, 20, 106);
    doc.text(`Age: ${petData?.age || 'N/A'} years`, 20, 114);
    doc.text(`Weight: ${petData?.weight || 'N/A'} kg`, 20, 122);

    doc.line(20, 128, 190, 128);
    doc.setFontSize(14);
    doc.setTextColor(13, 148, 136);
    doc.text('Owner Information', 20, 138);

    doc.setFontSize(11);
    doc.setTextColor(30);
    doc.text(`Owner Name: ${ownerData?.name || 'N/A'}`, 20, 146);
    doc.text(`Email: ${ownerData?.email || 'N/A'}`, 20, 154);
    doc.text(`Phone: ${ownerData?.phone || 'N/A'}`, 20, 162);

    doc.line(20, 168, 190, 168);
    doc.setFontSize(14);
    doc.setTextColor(13, 148, 136);
    doc.text('Clinical Diagnosis & Reason', 20, 178);

    doc.setFontSize(11);
    doc.setTextColor(30);
    doc.text(`Visit Reason: ${apt.reason}`, 20, 186);
    doc.text(`Veterinarian Notes: ${apt.vetNotes || 'Pending clinical review'}`, 20, 194);

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('Generated securely via PetHub Portal', 20, 280);

    doc.save(`PetHub-Report-${apt._id.slice(-6)}.pdf`);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="text-xs font-semibold tracking-widest text-teal-400 uppercase bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
            Clinical Schedules
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-3">
            {user?.role === 'vet' ? 'Veterinary Queue' : 'My Pet Appointments'}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {user?.role === 'owner' && (
            <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-xl h-fit">
              <h2 className="text-xl font-bold mb-6 text-white">Book New Visit</h2>
              <form onSubmit={handleBook} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Select Pet
                  </label>
                  <select
                    name="petId"
                    required
                    value={formData.petId}
                    onChange={handleChange}
                    className="w-full bg-slate-800/60 border border-slate-700/80 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                  >
                    <option value="" className="bg-slate-900 text-white">Choose a pet</option>
                    {pets.map((p: Pet) => (
                      <option key={p._id} value={p._id} className="bg-slate-900 text-white">
                        {p.name} ({p.species})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-slate-800/60 border border-slate-700/80 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Time Slot
                  </label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="w-full bg-slate-800/60 border border-slate-700/80 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                  >
                    <option value="09:00 AM - 10:00 AM" className="bg-slate-900 text-white">09:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 11:00 AM" className="bg-slate-900 text-white">10:00 AM - 11:00 AM</option>
                    <option value="02:00 PM - 03:00 PM" className="bg-slate-900 text-white">02:00 PM - 03:00 PM</option>
                    <option value="04:00 PM - 05:00 PM" className="bg-slate-900 text-white">04:00 PM - 05:00 PM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Reason
                  </label>
                  <textarea
                    name="reason"
                    required
                    rows={2}
                    placeholder="Vaccination, health check, injury..."
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full bg-slate-800/60 border border-slate-700/80 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-bold py-3.5 rounded-xl shadow-lg shadow-teal-500/20 transition duration-200"
                >
                  Schedule Appointment
                </button>
              </form>
            </div>
          )}

          <div className={user?.role === 'owner' ? 'lg:col-span-2' : 'lg:col-span-3'}>
            {isLoading ? (
              <div className="text-center py-12 text-slate-500">Loading appointments...</div>
            ) : appointments.length === 0 ? (
              <div className="text-center py-12 bg-slate-900/60 border border-slate-800 rounded-3xl text-slate-400">
                No appointments found.
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((apt: Appointment) => {
                  const petData = typeof apt.pet === 'object' ? (apt.pet as Pet) : null;
                  const ownerData = typeof apt.owner === 'object' ? (apt.owner as User) : null;

                  return (
                    <div key={apt._id} className="bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {petData ? `${petData.name}` : 'Pet Details'}
                            <span className="ml-3 text-xs font-normal text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-0.5 rounded-full uppercase tracking-wider">
                              {petData?.species}
                            </span>
                          </h3>
                          <p className="text-sm text-slate-400 mt-1">
                            Owner: {ownerData?.name} | Phone: {ownerData?.phone}
                          </p>
                        </div>
                        <span
                          className={`self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                            apt.status === 'confirmed'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : apt.status === 'completed'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : apt.status === 'cancelled'
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                              : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                          }`}
                        >
                          {apt.status}
                        </span>
                      </div>

                      <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-800 mb-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500 block text-xs">Date</span>
                          <span className="font-semibold text-slate-200">{new Date(apt.date).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-xs">Slot</span>
                          <span className="font-semibold text-slate-200">{apt.timeSlot}</span>
                        </div>
                      </div>

                      <p className="text-sm text-slate-300 mb-4">
                        <span className="text-slate-500 font-medium">Reason: </span>
                        {apt.reason}
                      </p>

                      {apt.vetNotes && (
                        <div className="bg-teal-500/5 border border-teal-500/20 p-4 rounded-2xl text-sm text-teal-200 mb-4">
                          <span className="font-bold text-teal-400 block text-xs mb-1">Veterinarian Notes:</span>
                          {apt.vetNotes}
                        </div>
                      )}

                      <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => generatePDF(apt)}
                            className="bg-slate-800 hover:bg-slate-700 text-teal-400 border border-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition"
                          >
                            Download PDF Slip
                          </button>
                          
                          {apt.status !== 'cancelled' && (
                            <button
                              onClick={() => dispatch(deleteAppointment(apt._id))}
                              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold px-4 py-2.5 rounded-xl transition"
                            >
                              Cancel Visit
                            </button>
                          )}
                        </div>

                        {user?.role === 'vet' && apt.status !== 'completed' && (
                          <div className="flex flex-wrap items-center gap-2">
                            <select
                              onChange={(e) => setStatusUpdate({ ...statusUpdate, status: e.target.value })}
                              defaultValue={apt.status}
                              className="text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                            >
                              <option value="confirmed">Confirm</option>
                              <option value="completed">Complete</option>
                              <option value="cancelled">Cancel</option>
                            </select>
                            <input
                              type="text"
                              placeholder="Clinical notes..."
                              onChange={(e) => setStatusUpdate({ ...statusUpdate, vetNotes: e.target.value })}
                              className="text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                            />
                            <button
                              onClick={() => handleStatusSubmit(apt._id)}
                              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition"
                            >
                              Update Status
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};