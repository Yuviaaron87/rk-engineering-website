import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Phone, Mail, MapPin, User, ChevronRight } from 'lucide-react';
import { COMPANY_DETAILS, NAV_ITEMS, ROUTES } from '../constants/route';

export const Footer: React.FC = () => {
  const handleNavClick = (href: string) => {
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

  const servicesList = [
    'Industrial Electrical Works',
    'Electrical Manpower Supply',
    'Panel Wiring & Installation',
    'Cable Laying & Termination',
    'Factory Electrical Maintenance',
    'Machine Electrical Connections',
  ];

  return (
    <footer className="relative bg-slate-100/90 text-slate-700 pt-16 pb-8 border-t border-slate-200/90 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-200">
          {/* Column 1: Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 to-blue-700 flex items-center justify-center text-white border border-sky-400/40 shadow-md shadow-sky-500/20">
                <Zap className="w-6 h-6 fill-white text-white" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-slate-900 tracking-wider block font-['Plus_Jakarta_Sans']">
                  RK ENGINEERING
                </span>
                <span className="text-xs text-sky-700 font-bold tracking-widest uppercase block -mt-1">
                  Electrical & Manpower Services
                </span>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              Delivering high-reliability industrial electrical contracts, installations, factory maintenance, and skilled electrical manpower for demanding industrial environments across South India.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-700">
              <span className="p-1.5 rounded-md bg-white border border-slate-200 text-sky-600 shadow-xs">
                <User className="w-4 h-4" />
              </span>
              <span>Founder & Owner: <strong className="text-slate-900 font-bold">{COMPANY_DETAILS.owner}</strong></span>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-l-3 border-sky-600 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="text-slate-600 hover:text-sky-600 font-medium transition-colors flex items-center group cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5 mr-1 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-l-3 border-sky-600 pl-3">
              Our Core Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {servicesList.map((srv, idx) => (
                <li key={idx} className="flex items-center text-slate-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mr-2.5" />
                  <span>{srv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-l-3 border-sky-600 pl-3">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-sky-400 transition-colors group"
              >
                <Phone className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-slate-500 block uppercase">Phone / Call</span>
                  <span className="text-slate-900 font-extrabold group-hover:text-sky-600 transition-colors">
                    {COMPANY_DETAILS.phone}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY_DETAILS.email}`}
                className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-sky-400 transition-colors group"
              >
                <Mail className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div className="overflow-hidden">
                  <span className="text-[11px] font-bold text-slate-500 block uppercase">Email Enquiry</span>
                  <span className="text-slate-900 font-bold text-xs truncate block group-hover:text-sky-600 transition-colors">
                    {COMPANY_DETAILS.email}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3 px-3 py-2 text-xs text-slate-600 font-medium">
                <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Industrial Hubs & Manufacturing Facilities Across Tamil Nadu & South India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-900 font-bold">{COMPANY_DETAILS.name}</strong>. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <span>Founder & Owner: <strong className="text-slate-900 font-bold">{COMPANY_DETAILS.owner}</strong></span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-medium">Industrial Electrical Contractors</span>
            <span className="text-slate-300">|</span>
            <Link to={ROUTES.ADMIN_LOGIN} className="text-sky-700 hover:text-sky-800 font-bold underline">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
