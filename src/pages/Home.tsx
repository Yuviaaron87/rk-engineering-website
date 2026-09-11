import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Zap,
  ShieldCheck,
  Users,
  Factory,
  Wrench,
  Cpu,
  Layers,
  Activity,
  Settings,
  Phone,
  ArrowRight,
  CheckCircle2,
  Building2,
  Award,
  Clock,
  Sparkles,
  HardHat,
  Gauge,
  Briefcase,
  SlidersHorizontal,
} from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';
import { ServiceCard } from '../components/ServiceCard';
import { ProjectCard, type ProjectItem } from '../components/ProjectCard';
import { OwnerCard } from '../components/OwnerCard';
import { ContactForm } from '../components/ContactForm';
import { Button } from '../components/Button';
import { COMPANY_DETAILS } from '../constants/route';

export const Home: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('');

  const handleEnquireService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      const offsetTop = contactEl.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollTo = (targetId: string) => {
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const offsetTop = targetEl.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  // 8 Core Electrical Services
  const servicesData = [
    {
      icon: Factory,
      title: 'Industrial Electrical Works',
      description:
        'Complete turn-key industrial electrification, power distribution systems, factory floor wiring, and heavy-duty electrical contract execution.',
    },
    {
      icon: Users,
      title: 'Electrical Manpower Supply',
      description:
        'Flexible deputation of certified industrial electricians, wiremen, cable jointers, panel technicians, and experienced site supervisors.',
    },
    {
      icon: Cpu,
      title: 'Electrical Installation Works',
      description:
        'Installation of transformers, HT/LT switchgears, busducts, distribution boards, and heavy plant electrical machinery.',
    },
    {
      icon: Layers,
      title: 'Panel Wiring & Installation',
      description:
        'Assembly, wiring, installation, and testing of PCC, MCC, APFC, control panels, and power distribution enclosures.',
    },
    {
      icon: Activity,
      title: 'Cable Laying & Termination',
      description:
        'HT/LT cable tray installation, underground cable trenching, precision glanding, termination, and megger testing.',
    },
    {
      icon: Wrench,
      title: 'Industrial Electrical Maintenance',
      description:
        'Preventive, scheduled, and breakdown maintenance services for continuous production uptime in manufacturing units.',
    },
    {
      icon: Settings,
      title: 'Machine Electrical Connections',
      description:
        'Electrical integration and power connections for CNC machines, conveyor systems, motors, drives, and automated production lines.',
    },
    {
      icon: Zap,
      title: 'Troubleshooting & Support',
      description:
        'Rapid diagnostic fault finding, earth resistance measurement, load balancing, phase corrections, and emergency site support.',
    },
  ];

  // Project Experience associated with client companies
  const projectItems: ProjectItem[] = [
    {
      id: 'mrv',
      company: 'MRV',
      category: 'R&D Industrial Center',
      description:
        'Supported complex electrical installation, control panel wiring, cable routing, and specialized electrical workforce deployment.',
      tags: ['Electrical Installation', 'Manpower Supply', 'Panel Wiring'],
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'bmw',
      company: 'BMW',
      category: 'Automotive Manufacturing Plant',
      description:
        'Executed industrial cable laying, machine power connections, assembly line electrical maintenance, and skilled wiremen support.',
      tags: ['Automotive Electrification', 'Cable Management', 'Plant Maintenance'],
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'nemak',
      company: 'Nemak',
      category: 'Heavy Foundry & Components',
      description:
        'Heavy industrial electrical works including furnace panel connections, high-capacity cable terminations, and breakdown troubleshooting.',
      tags: ['Foundry Electrical Works', 'Heavy Machinery', 'Troubleshooting'],
      imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'caterpillar',
      company: 'Caterpillar',
      category: 'Heavy Equipment Facility',
      description:
        'Provided skilled electrical manpower for plant utility maintenance, electrical panel wiring, and machine power hookups.',
      tags: ['Industrial Manpower', 'Panel Hookups', 'Utility Power'],
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'royalenfield',
      company: 'Royal Enfield',
      category: 'Automotive Assembly Facility',
      description:
        'Carried out shop floor electrical wiring, cable tray installations, motor control connections, and routine electrical site support.',
      tags: ['Assembly Line Electrification', 'Cable Trays', 'Manpower Support'],
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // Why Choose Us points
  const whyChooseUsData = [
    {
      icon: Users,
      title: 'Experienced Electrical Workforce',
      description: 'Hand-picked, certified electricians and wiremen trained specifically for industrial plant safety and precision.',
    },
    {
      icon: Briefcase,
      title: 'Industrial Project Experience',
      description: 'Proven exposure in leading automotive and heavy manufacturing plants across Tamil Nadu.',
    },
    {
      icon: ShieldCheck,
      title: 'Safety-Focused Execution',
      description: 'Strict adherence to electrical codes, PPE requirements, and zero-accident industrial safety protocols.',
    },
    {
      icon: Award,
      title: 'Quality Workmanship',
      description: 'Neat cable routing, standardized crimping, phase color coding, and thorough pre-commissioning checks.',
    },
    {
      icon: Clock,
      title: 'Reliable Project Delivery',
      description: 'We respect production deadlines and deliver site execution on schedule without compromising safety.',
    },
    {
      icon: SlidersHorizontal,
      title: 'Flexible Manpower Support',
      description: 'Scalable electrician manpower supply matching short-term shut-downs or long-term industrial projects.',
    },
  ];

  return (
    <div className="w-full bg-slate-50">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section id="home" className="relative min-h-[90vh] pt-28 pb-20 flex items-center bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/60 overflow-hidden">
        {/* Subtle background light grid pattern */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px)`,
            backgroundSize: `36px 36px`,
          }}
        />

        {/* Ambient Radial Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sky-200 text-sky-700 text-xs sm:text-sm font-bold tracking-wide shadow-md shadow-sky-500/10"
              >
                <Zap className="w-4 h-4 text-sky-600 fill-sky-600/20 animate-pulse" />
                <span>Industrial Electrical & Manpower Specialists</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]"
              >
                Reliable Electrical Solutions.{' '}
                <span className="electric-text-gradient block mt-1 sm:mt-2">
                  Powered by Skilled Manpower.
                </span>
              </motion.h1>

              {/* Supporting text */}
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-slate-600 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl"
              >
                RK ENGINEERING delivers dependable industrial electrical works, maintenance, installations and skilled electrical manpower for demanding industrial environments.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
              >
                <Button
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  onClick={() => handleScrollTo('contact')}
                >
                  Get a Free Quote
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleScrollTo('services')}
                >
                  Explore Our Services
                </Button>
              </motion.div>

              {/* Small Trust Indicators Under Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                {[
                  { label: 'Industrial Expertise', icon: Factory },
                  { label: 'Skilled Workforce', icon: Users },
                  { label: 'Safety Focused', icon: ShieldCheck },
                  { label: 'Reliable Execution', icon: CheckCircle2 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                    <item.icon className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Hero Visual Card & Floating Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 p-2 shadow-2xl">
                {/* Main Hero Visual Image */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
                    alt="Industrial Electrical Engineering & Panel Control"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Visual Overlay Tag */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-xs font-bold text-slate-900 shadow-md">
                    <HardHat className="w-4 h-4 text-sky-600" />
                    <span>On-Site Industrial Engineering</span>
                  </div>

                  {/* Inner Details */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-left shadow-lg">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-semibold">
                      <span>CONTRACTOR & MANPOWER</span>
                      <span className="text-sky-700 font-mono font-extrabold">RK ENG</span>
                    </div>
                    <div className="text-slate-900 font-extrabold text-sm">
                      Industrial Plant Power & Control Wiring
                    </div>
                    <div className="text-slate-600 text-xs mt-0.5 font-medium">
                      Under leadership of Kannan R
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -bottom-6 -left-4 sm:-left-6 p-4 rounded-xl bg-white backdrop-blur-xl border border-slate-200 shadow-2xl flex items-center space-x-3"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 border border-sky-200">
                  <Gauge className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-900">10+ Projects</div>
                  <div className="text-xs text-sky-700 font-bold">Industrial Site Execution</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ABOUT SECTION */}
      {/* ========================================================================= */}
      <section id="about" className="w-full bg-white py-20 sm:py-24 border-b border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="About RK ENGINEERING"
            badgeIcon={Factory}
            title="Engineering Reliability Into Every Connection"
            subtitle="Dedicated electrical engineering contractor and manpower supplier for industrial facilities across South India."
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Main Description */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/90 shadow-xl space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">
                  Powering Modern Manufacturing & Industrial Infrastructure
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  <strong className="text-slate-900 font-semibold">RK ENGINEERING</strong> is an electrical engineering and manpower service company focused on delivering reliable, safe and efficient electrical solutions for industrial environments. We support industries with experienced manpower, electrical installation, maintenance, cable works, panel wiring and project execution.
                </p>
                <p className="text-slate-600 text-base leading-relaxed">
                  Founded and managed by <strong className="text-sky-700 font-bold">{COMPANY_DETAILS.owner}</strong>, our operation brings rigorous hands-on site coordination, ensuring that electrical installations comply with safety standards, project blueprints, and production schedules.
                </p>

                <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-200/80">
                  <div>
                    <div className="text-2xl font-extrabold text-sky-600">100%</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">Safety Code Compliance</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-blue-600">Certified</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">Electricians & Technicians</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-slate-900">End-to-End</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">Site Project Execution</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Highlight Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Factory,
                  title: 'Industrial Expertise',
                  desc: 'Specialized experience in automotive, foundry, and heavy engineering facilities.',
                },
                {
                  icon: Users,
                  title: 'Skilled Manpower',
                  desc: 'Deputation of qualified wiremen, cable jointers, and site supervisors on demand.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Safety First',
                  desc: 'Zero-compromise adherence to industrial electrical safety regulations and PPE.',
                },
                {
                  icon: Award,
                  title: 'Quality Execution',
                  desc: 'Precision panel wiring, neat cable routing, and pre-commissioning testing.',
                },
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-5 rounded-xl bg-slate-50/80 border border-slate-200/90 shadow-md hover:shadow-xl hover:border-sky-400 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-3 group-hover:scale-110 transition-transform">
                    <card.icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-slate-900 font-bold text-base mb-1 group-hover:text-sky-600 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SERVICES SECTION */}
      {/* ========================================================================= */}
      <section id="services" className="w-full bg-slate-50/80 py-20 sm:py-24 border-b border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Our Electrical Services"
            badgeIcon={Zap}
            title="Comprehensive Industrial Services"
            subtitle="From complete factory installations to specialized manpower deputation, RK ENGINEERING provides end-to-end electrical contract solutions."
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((srv, idx) => (
              <ServiceCard
                key={idx}
                index={idx}
                icon={srv.icon}
                title={srv.title}
                description={srv.description}
                onEnquire={handleEnquireService}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHY CHOOSE US SECTION */}
      {/* ========================================================================= */}
      <section id="why-choose-us" className="w-full bg-white py-20 sm:py-24 border-b border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Why Choose Us"
            badgeIcon={ShieldCheck}
            title="Why Industries Choose RK ENGINEERING"
            subtitle="Delivering dependable execution, technical competence, and flexible workforce solutions."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUsData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/90 shadow-md hover:shadow-xl hover:border-sky-400 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-4 group-hover:bg-sky-600 group-hover:text-white transition-all">
                  <item.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Strong Statement Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 p-8 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-cyan-50 border border-sky-200 shadow-xl text-center relative overflow-hidden"
          >
            <div className="relative z-10 max-w-3xl mx-auto space-y-3">
              <Zap className="w-8 h-8 text-sky-600 mx-auto fill-sky-600/20" />
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                "From installation to manpower support, we focus on safety, precision and dependable execution."
              </p>
              <p className="text-sky-700 text-xs uppercase font-bold tracking-wider">
                RK ENGINEERING Core Philosophy
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PROJECT / CLIENT EXPERIENCE SECTION */}
      {/* ========================================================================= */}
      <section id="projects" className="w-full bg-slate-50/80 py-20 sm:py-24 border-b border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Project Exposure"
            badgeIcon={Building2}
            title="Industries & Companies We Have Worked With"
            subtitle="Electrical works carried out across leading industrial environments."
          />

          {/* Company Names Infinite Marquee Strip */}
          <div className="mt-8 overflow-hidden rounded-xl bg-white border border-slate-200/90 shadow-md p-4">
            <div className="animate-marquee items-center gap-12">
              {[...projectItems, ...projectItems].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                  <span className="text-slate-900 font-extrabold text-lg tracking-wider font-mono uppercase">
                    {item.company}
                  </span>
                  <span className="text-slate-500 text-xs font-bold">| INDUSTRIAL SITE</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectItems.map((proj, idx) => (
              <ProjectCard key={proj.id} project={proj} index={idx} />
            ))}
          </div>

          {/* Subtle Disclaimer */}
          <div className="mt-8 text-center text-xs text-slate-500 italic max-w-2xl mx-auto">
            * Company names are shown to represent prior work/project exposure and do not imply official partnership or endorsement.
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. OWNER / FOUNDER SECTION */}
      {/* ========================================================================= */}
      <section id="owner" className="w-full bg-white py-20 sm:py-24 border-b border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Founder & Leadership"
            badgeIcon={Award}
            title="Meet Our Founder"
            subtitle="Hands-on technical leadership driving quality and reliability in industrial electrical contracting."
          />

          <div className="mt-12">
            <OwnerCard />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. ACHIEVEMENTS / STATS SECTION */}
      {/* ========================================================================= */}
      <section className="w-full bg-slate-50/80 py-16 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200/90 shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { metric: 'Industrial Exposure', label: 'Automotive & Heavy Manufacturing' },
              { metric: 'Skilled Workforce', label: 'Certified Electricians & Wiremen' },
              { metric: 'Quality Execution', label: 'Tested & Verified Installations' },
              { metric: 'Dedicated Support', label: '24/7 Site Assistance & Maintenance' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="space-y-2"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 font-['Plus_Jakarta_Sans']">
                  {stat.metric}
                </div>
                <div className="text-slate-700 text-xs sm:text-sm font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CTA BANNER SECTION */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-20 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-sky-50 via-white to-blue-50 border border-sky-200/90 p-8 sm:p-12 lg:p-16 shadow-2xl text-center text-slate-900"
          >
            {/* Ambient Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Ready for Immediate Deployment</span>
              </span>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                Need Reliable Electrical Manpower or Industrial Electrical Support?
              </h3>

              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                Talk to RK ENGINEERING about your next electrical installation, maintenance or manpower requirement.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={`tel:${COMPANY_DETAILS.phoneRaw}`}>
                  <Button variant="primary" size="lg" icon={Phone}>
                    Call Now: {COMPANY_DETAILS.phone}
                  </Button>
                </a>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleScrollTo('contact')}
                >
                  Get a Quote Online
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. CONTACT SECTION */}
      {/* ========================================================================= */}
      <section id="contact" className="w-full bg-slate-50/80 py-20 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Get In Touch"
            badgeIcon={Phone}
            title="Let's Discuss Your Requirement"
            subtitle="Reach out directly to Kannan R or fill out our project enquiry form below."
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Direct Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xl space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  Contact RK ENGINEERING
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Whether you need specialized wiremen for a plant shutdown or a complete electrical contract partner, we are ready to assist.
                </p>

                <div className="space-y-4 pt-2">
                  {/* Phone */}
                  <a
                    href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                    className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-400 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-600 group-hover:scale-105 transition-transform shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Direct Phone
                      </span>
                      <span className="text-slate-900 font-extrabold text-base sm:text-lg group-hover:text-sky-600 transition-colors block">
                        {COMPANY_DETAILS.phone}
                      </span>
                      <span className="text-slate-500 text-xs">Call or WhatsApp</span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${COMPANY_DETAILS.email}`}
                    className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-400 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-600 group-hover:scale-105 transition-transform shrink-0">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Official Email
                      </span>
                      <span className="text-slate-900 font-extrabold text-sm sm:text-base group-hover:text-sky-600 transition-colors block truncate">
                        {COMPANY_DETAILS.email}
                      </span>
                      <span className="text-slate-500 text-xs">Fast Response guaranteed</span>
                    </div>
                  </a>

                  {/* Company Details Box */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Business Name:</span>
                      <span className="text-slate-900 font-bold">{COMPANY_DETAILS.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Founder & Owner:</span>
                      <span className="text-sky-700 font-bold">{COMPANY_DETAILS.owner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Service Coverage:</span>
                      <span className="text-slate-900 font-bold">Tamil Nadu & South India</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm initialService={selectedService} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
