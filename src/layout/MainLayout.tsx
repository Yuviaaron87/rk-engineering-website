import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'motion/react';
import { MessageSquare } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { COMPANY_DETAILS } from '../constants/route';

export const MainLayout: React.FC = () => {
  const whatsappUrl = `https://wa.me/${COMPANY_DETAILS.phoneRaw}?text=${encodeURIComponent(
    COMPANY_DETAILS.whatsappMessage
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 relative overflow-x-hidden">
      <ScrollToTop />
      <Navbar />

      {/* Main Content Body */}
      <main className="flex-1 bg-slate-50">
        <Outlet />
      </main>

      <Footer />

      {/* Floating WhatsApp Contact Widget (Bottom-Right) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-40 group flex items-center"
      >
        {/* Desktop Tooltip */}
        <span className="hidden sm:inline-block mr-3 px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-semibold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Chat with RK ENGINEERING on WhatsApp
        </span>

        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-600/40 border-2 border-white/80 transition-all duration-300 relative"
          aria-label="Contact RK ENGINEERING on WhatsApp"
        >
          {/* Subtle pulse ring */}
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30 pointer-events-none" />
          <MessageSquare className="w-7 h-7 fill-white text-emerald-600 relative z-10" />
        </motion.a>
      </motion.div>
    </div>
  );
};
