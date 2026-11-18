import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export const Home: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col justify-center items-center px-4 text-center">
      <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
        Welcome to PetHub
      </h1>
      <p className="max-w-2xl text-lg text-slate-600 mb-8">
        The complete pet health and veterinary care management platform. Manage pet profiles, schedule appointments, and coordinate medical records seamlessly.
      </p>
      <div className="flex space-x-4">
        {user ? (
          <Link
            to="/pets"
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-lg shadow-sm transition"
          >
            Go to My Pets
          </Link>
        ) : (
          <>
            <Link
              to="/register"
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-lg shadow-sm transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white hover:bg-slate-100 text-slate-700 font-medium px-6 py-3 rounded-lg border border-slate-300 shadow-sm transition"
            >
              Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
};