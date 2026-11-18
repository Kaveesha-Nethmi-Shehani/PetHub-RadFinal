import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { logoutUser } from '../features/authSlice';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-10">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                PetHub.
              </span>
            </Link>
            {user && (
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  to="/pets"
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition duration-200 ${
                    isActive('/pets')
                      ? 'bg-slate-800 text-teal-400 border border-slate-700/80'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  My Pets
                </Link>
                <Link
                  to="/appointments"
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition duration-200 ${
                    isActive('/appointments')
                      ? 'bg-slate-800 text-teal-400 border border-slate-700/80'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  Appointments
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-semibold text-white">{user.name}</span>
                  <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-slate-800 hover:bg-red-500/10 hover:text-red-400 text-slate-300 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium transition duration-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm shadow-lg shadow-teal-500/20 transition duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};