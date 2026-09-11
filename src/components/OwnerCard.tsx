import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, CheckCircle2, UserCheck } from 'lucide-react';
import ownerPhoto from '../assets/images/kannan-r.png';
import { COMPANY_DETAILS } from '../constants/route';
import { Button } from './Button';

export const OwnerCard: React.FC = () => {
  const values = [
    { label: 'Quality', desc: 'Uncompromised standards in installation & wiring' },
    { label: 'Reliability', desc: 'On-time execution & dependable manpower' },
    { label: 'Safety', desc: 'Strict industrial compliance & safety protocols' },
    { label: 'Commitment', desc: 'Dedicated client support from planning to completion' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-[24px] bg-gradient-to-br from-white via-slate-50 to-sky-50/40 overflow-hidden border border-slate-200/90 shadow-2xl"
    >
      {/* Top Electric Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-600 via-blue-500 to-cyan-500" />

      {/* Decorative Glow */}
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
        {/* Left Column: Founder Photo */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-sm sm:max-w-md lg:max-w-none group"
          >
            {/* Outer Frame with Electric Border */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-sky-300 p-1.5 bg-white shadow-xl">
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={ownerPhoto}
                  alt="Kannan R - Founder & Owner of RK ENGINEERING"
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient overlay at bottom of photo for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-85" />

                {/* Founder Badge overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-center shadow-xl">
                  <div className="text-slate-900 font-extrabold text-lg tracking-wide">
                    {COMPANY_DETAILS.owner}
                  </div>
                  <div className="text-sky-700 text-xs font-bold uppercase tracking-wider">
                    {COMPANY_DETAILS.role}
                  </div>
                </div>
              </div>
            </div>

            {/* Corner Decorative Accent Dots */}
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-sky-500/80 blur-xs" />
            <div className="absolute -bottom-2 -left-2 w-5 h-5 rounded-full bg-blue-500/80 blur-xs" />
          </motion.div>
        </div>

        {/* Right Column: Founder Details */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
              <UserCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>Leadership & Vision</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {COMPANY_DETAILS.owner}
            </h3>
            <p className="text-sky-700 font-bold text-lg mt-1">
              Founder & Owner — {COMPANY_DETAILS.name}
            </p>
          </div>

          <blockquote className="relative p-4 rounded-xl bg-sky-50/80 border-l-4 border-sky-600 text-slate-800 italic text-base leading-relaxed">
            "Leading RK ENGINEERING with a commitment to reliable workmanship, skilled manpower and professional industrial electrical execution."
          </blockquote>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            With a hands-on approach to project coordination and execution, Kannan R focuses on delivering dependable electrical services while maintaining quality, safety and customer satisfaction.
          </p>

          {/* Mini-value labels */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {values.map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
                className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start space-x-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-900 font-bold text-xs uppercase tracking-wide block">
                    {v.label}
                  </span>
                  <span className="text-slate-500 text-[11px] leading-tight block">
                    {v.desc}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Row */}
          <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-slate-200">
            <a href={`tel:${COMPANY_DETAILS.phoneRaw}`}>
              <Button variant="primary" icon={Phone}>
                Call Kannan R
              </Button>
            </a>
            <a href={`mailto:${COMPANY_DETAILS.email}`}>
              <Button variant="outline" icon={Mail}>
                Send Direct Email
              </Button>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
