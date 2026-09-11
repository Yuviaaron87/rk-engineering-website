import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Zap, Home } from 'lucide-react';
import { Button } from '../components/Button';
import { ROUTES } from '../constants/route';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 relative z-10 shadow-2xl"
      >
        <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center mx-auto shadow-md">
          <Zap className="w-8 h-8 fill-sky-600/20" />
        </div>

        <div className="space-y-2">
          <span className="text-sky-600 text-xs font-mono font-bold tracking-widest uppercase block">
            Error 404 — Page Not Found
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900">
            Connection Lost
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2">
            The page or electrical circuit you are trying to reach does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to={ROUTES.HOME} className="w-full sm:w-auto">
            <Button variant="primary" fullWidth icon={Home}>
              Return to Homepage
            </Button>
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-100 text-xs text-slate-400 font-medium">
          RK ENGINEERING — Industrial Electrical Works & Manpower Services
        </div>
      </motion.div>
    </div>
  );
};
