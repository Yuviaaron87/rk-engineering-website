import React from 'react';
import { motion } from 'motion/react';
import { Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export interface ProjectItem {
  id: string;
  company: string;
  category: string;
  description: string;
  tags: string[];
  imageUrl: string;
}

export interface ProjectCardProps {
  project: ProjectItem;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:border-sky-400 transition-all duration-300 flex flex-col h-full"
    >
      {/* Background Image Container */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-900">
        <img
          src={project.imageUrl}
          alt={`${project.company} Project Experience`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        
        {/* Company Name Badge */}
        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 font-extrabold text-sm tracking-wide shadow-md">
          <Building2 className="w-4 h-4 text-sky-600" />
          <span>{project.company}</span>
        </div>

        {/* Verification badge */}
        <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-emerald-200 text-emerald-700 text-xs font-bold shadow-md">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Industrial Site</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 block mb-1">
            {project.category}
          </span>
          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
            {project.company} Industrial Experience
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80"
              >
                <CheckCircle2 className="w-3 h-3 text-sky-600 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
