import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { registerUser, clearError } from '../features/authSlice';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'owner',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, isError, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(clearError());
    if (user) {
      navigate('/pets');
    }
  }, [user, navigate, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(20,184,166,0.18),rgba(255,255,255,0))] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-slate-900/75 border border-slate-800/90 p-8 sm:p-10 rounded-3xl shadow-[0_0_50px_-12px_rgba(20,184,166,0.18)] backdrop-blur-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-teal-500/25 mb-4">
            <svg
              className="w-7 h-7 text-slate-950"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <ellipse cx="12" cy="17" rx="3.5" ry="2.8" />
              <ellipse cx="6" cy="11" rx="1.8" ry="2.5" transform="rotate(-15 6 11)" />
              <ellipse cx="18" cy="11" rx="1.8" ry="2.5" transform="rotate(15 18 11)" />
              <circle cx="9.5" cy="7" r="1.8" />
              <circle cx="14.5" cy="7" r="1.8" />
            </svg>
          </div>
          <span className="inline-block bg-teal-500/10 text-teal-300 border border-teal-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Create Account
          </span>
          <h2 className="text-3xl font-black text-white tracking-tight mt-3">
            Join PetHub
          </h2>
          <p className="text-slate-400 text-sm mt-1.5">
            Register your profile to manage pet clinical care
          </p>
        </div>

        {isError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-xl mb-6 text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Rusini Thiranja"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                required
                placeholder="07xxxxxxxx"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-slate-800/80 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              >
                <option value="owner" className="bg-slate-900 text-white">Pet Owner</option>
                <option value="vet" className="bg-slate-900 text-white">Pet Specialist</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Create secure password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-extrabold py-3.5 rounded-xl shadow-lg shadow-teal-500/25 transition duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          Already registered?{' '}
          <Link to="/login" className="text-teal-400 font-bold hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};