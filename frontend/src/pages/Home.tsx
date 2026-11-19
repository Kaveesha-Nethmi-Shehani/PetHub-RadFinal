import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export const Home: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div
      className="min-h-[calc(100vh-5rem)] text-white flex flex-col justify-between"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.75)), url('https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="max-w-5xl mx-auto text-center pt-24 pb-16 px-4 space-y-6">
        <span className="inline-block bg-slate-900/60 text-teal-300 border border-teal-500/40 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg">
          Intelligent Pet Health & Veterinary Platform
        </span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight drop-shadow-md">
          Compassionate Care For Your <span className="bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">Beloved Pets</span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-100 text-base md:text-lg leading-relaxed drop-shadow">
          The unified digital portal for veterinary clinical workflows, pet profile management, instant medical slip generation, and rapid lost pet identification.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          {user ? (
            <Link
              to="/pets"
              className="bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-extrabold px-8 py-4 rounded-2xl shadow-xl shadow-teal-500/25 transition duration-200"
            >
              Go to My Pets
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-extrabold px-8 py-4 rounded-2xl shadow-xl shadow-teal-500/25 transition duration-200"
              >
                Create Free Account
              </Link>
              <Link
                to="/login"
                className="bg-slate-900/90 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-2xl border border-slate-700/80 backdrop-blur-md transition duration-200"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto pb-20 px-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-slate-700/80 p-8 rounded-3xl backdrop-blur-md shadow-2xl hover:border-teal-500/40 transition duration-300">
            <span className="text-teal-400 text-xs font-mono font-bold tracking-wider uppercase block mb-3">
              Feature 01
            </span>
            <h3 className="text-xl font-extrabold text-white mb-2">Pet Profiles & QR Tags</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Maintain complete medical vitals, breed specifics, and instant printable collar QR codes for lost pet retrieval.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-700/80 p-8 rounded-3xl backdrop-blur-md shadow-2xl hover:border-teal-500/40 transition duration-300">
            <span className="text-teal-400 text-xs font-mono font-bold tracking-wider uppercase block mb-3">
              Feature 02
            </span>
            <h3 className="text-xl font-extrabold text-white mb-2">Smart Clinical Queue</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Book veterinary time-slots seamlessly and receive official automated PDF medical slips and treatment summaries.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-700/80 p-8 rounded-3xl backdrop-blur-md shadow-2xl hover:border-teal-500/40 transition duration-300">
            <span className="text-teal-400 text-xs font-mono font-bold tracking-wider uppercase block mb-3">
              Feature 03
            </span>
            <h3 className="text-xl font-extrabold text-white mb-2">Real-Time Records</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Maintain verified patient consultation history and monitor appointments live in the clinical portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};