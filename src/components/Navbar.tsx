import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Zap, Phone, ArrowUpRight } from 'lucide-react';
import { NAV_ITEMS, COMPANY_DETAILS } from '../constants/route';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll for navbar background, active link highlight, and progress bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Scroll progress
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        setScrollProgress((winScroll / height) * 100);
      }

      // Section spy
      const sections = NAV_ITEMS.map((item) => item.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i]);
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const offsetTop = targetEl.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Scroll Progress Indicator Bar at top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-slate-200">
        <div
          className="h-full bg-gradient-to-r from-sky-600 via-blue-500 to-cyan-400 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-[3px] left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3'
            : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/40 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 to-blue-700 flex items-center justify-center text-white border border-sky-400/40 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300">
              <Zap className="w-6 h-6 fill-white text-white" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-wider block font-['Plus_Jakarta_Sans'] group-hover:text-sky-600 transition-colors">
                RK ENGINEERING
              </span>
              <span className="text-[10px] text-sky-700 font-bold tracking-widest uppercase block -mt-1">
                Industrial Services
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {NAV_ITEMS.map((item) => {
              const secId = item.href.replace('#', '');
              const isActive = activeSection === secId;

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`relative px-3.5 py-2 text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                    isActive ? 'text-sky-600 font-bold' : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-gradient-to-r from-sky-600 to-blue-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${COMPANY_DETAILS.phoneRaw}`}
              className="text-xs font-bold text-slate-700 hover:text-sky-600 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-sky-300"
            >
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              <span>{COMPANY_DETAILS.phone}</span>
            </a>
            <Button
              variant="primary"
              size="sm"
              icon={ArrowUpRight}
              onClick={() => handleNavClick('#contact')}
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${COMPANY_DETAILS.phoneRaw}`}
              className="p-2 rounded-xl bg-white border border-slate-200 text-sky-600 shadow-xs"
              aria-label="Call RK ENGINEERING"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white text-slate-800 border border-slate-200 hover:text-slate-950 focus:outline-none shadow-xs cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden bg-slate-900/40 backdrop-blur-md flex flex-col justify-between"
          >
            <div className="w-full bg-white shadow-2xl flex flex-col h-full max-w-md ml-auto">
              {/* Mobile Header */}
              <div className="p-4 sm:p-6 flex items-center justify-between border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-600 flex items-center justify-center text-white">
                    <Zap className="w-5 h-5 fill-white text-white" />
                  </div>
                  <div>
                    <span className="text-base font-extrabold text-slate-900 block">RK ENGINEERING</span>
                    <span className="text-[10px] text-sky-700 font-bold uppercase tracking-wider block">
                      Electrical Solutions
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-slate-100 text-slate-600 border border-slate-200"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="px-6 py-6 overflow-y-auto space-y-2 flex-1">
                {NAV_ITEMS.map((item, idx) => {
                  const secId = item.href.replace('#', '');
                  const isActive = activeSection === secId;

                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 + 0.05 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className={`block py-3 px-4 rounded-xl font-bold text-base transition-all ${
                        isActive
                          ? 'bg-sky-50 text-sky-700 border border-sky-200'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {item.name}
                    </motion.a>
                  );
                })}
              </div>

              {/* Mobile Footer CTAs */}
              <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-3">
                <Button
                  variant="primary"
                  fullWidth
                  icon={ArrowUpRight}
                  onClick={() => handleNavClick('#contact')}
                >
                  Get a Quote
                </Button>
                <div className="text-center pt-2 text-xs text-slate-600">
                  Founder: <span className="text-slate-900 font-bold">{COMPANY_DETAILS.owner}</span> | Phone:{' '}
                  <a href={`tel:${COMPANY_DETAILS.phoneRaw}`} className="text-sky-700 font-bold underline">
                    {COMPANY_DETAILS.phone}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
