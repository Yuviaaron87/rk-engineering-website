import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, type LucideIcon } from 'lucide-react';

export interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
  onEnquire?: (serviceTitle: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  index = 0,
  onEnquire,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-sky-500/15 hover:border-sky-400 transition-all duration-300 overflow-hidden"
    >
      {/* Top electric line on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Ambient background glow */}
      <div className="absolute -right-12 -top-12 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl group-hover:bg-sky-500/10 transition-all duration-500 pointer-events-none" />

      <div>
        {/* Icon box */}
        <div className="w-14 h-14 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-6 text-sky-600 group-hover:text-white group-hover:bg-sky-600 group-hover:border-sky-600 transition-all duration-300 shadow-xs">
          <Icon className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors duration-300 mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Interactive Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
        <button
          onClick={() => onEnquire?.(title)}
          className="inline-flex items-center text-xs font-bold text-sky-600 group-hover:text-sky-700 transition-colors cursor-pointer"
        >
          <span>Enquire Service</span>
          <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1.5" />
        </button>
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
          RK ENG
        </span>
      </div>
    </motion.div>
  );
};
