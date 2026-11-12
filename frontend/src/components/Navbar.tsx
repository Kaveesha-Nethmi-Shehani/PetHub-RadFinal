import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { logoutUser } from '../features/authSlice';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold tracking-tight text-teal-400">
              PetHub
            </Link>
            {user && (
              <div className="hidden md:flex space-x-4">
                <Link to="/pets" className="hover:text-teal-400 transition">
                  My Pets
                </Link>
                <Link to="/appointments" className="hover:text-teal-400 transition">
                  Appointments
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-300">
                  {user.name} ({user.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-3">
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white px-3 py-1.5 rounded text-sm transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded text-sm transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};