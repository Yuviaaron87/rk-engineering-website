import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, User, AlertCircle, ArrowLeft, Zap } from 'lucide-react';
import { Button } from '../components/Button';
import { ROUTES } from '../constants/route';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Check credentials strictly per system rule: Admin / admin@123
    if (username === 'Admin' && password === 'admin@123') {
      sessionStorage.setItem('rk_admin_auth', 'true');
      sessionStorage.setItem('rk_admin_user', 'Admin');
      navigate(ROUTES.ADMIN_DASHBOARD);
    } else {
      setError('Invalid username or password. Please use Admin / admin@123');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-8 sm:p-10 relative z-10 space-y-6"
      >
        {/* Back Link */}
        <Link
          to={ROUTES.HOME}
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-sky-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back to Main Website</span>
        </Link>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            RK ENGINEERING Admin Portal
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Sign in to manage client enquiries & site message logs
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Admin Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                placeholder="Enter admin username"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-200 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-sm transition-all"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter password"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-200 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-sm transition-all"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button type="submit" variant="primary" fullWidth icon={Zap}>
              Access Admin Dashboard
            </Button>
          </div>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center">
          <span className="text-[11px] text-slate-400 font-medium">
            Authorized Personnel Only — Owner: Kannan R
          </span>
        </div>
      </motion.div>
    </div>
  );
};
