import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, AlertCircle, Loader2, Sparkles, MailCheck } from 'lucide-react';
import { Button } from './Button';
import { COMPANY_DETAILS } from '../constants/route';
import { saveEnquiry } from '../utils/storage';
import { sendEnquiryEmail } from '../utils/email';

interface FormData {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  serviceRequired: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  serviceRequired?: string;
  message?: string;
}

const SERVICES_LIST = [
  'Industrial Electrical Works',
  'Electrical Manpower Supply',
  'Electrical Installation Works',
  'Panel Installation & Wiring',
  'Cable Laying & Termination',
  'Industrial Electrical Maintenance',
  'Machine Electrical Connections',
  'Troubleshooting & Site Support',
  'Electrical Contract Works',
];

interface ContactFormProps {
  initialService?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialService = '' }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    serviceRequired: initialService || SERVICES_LIST[0],
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [statusNote, setStatusNote] = useState<string>('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.serviceRequired) {
      newErrors.serviceRequired = 'Please select a service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide brief details of your requirement';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // 1. Save to local storage for Admin Portal access
    saveEnquiry(formData);

    // 2. Send via EmailJS to Kannan R
    const result = await sendEnquiryEmail(formData);

    setIsSubmitting(false);
    setIsSubmitted(true);
    setStatusNote(result.message);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      companyName: '',
      phone: '',
      email: '',
      serviceRequired: SERVICES_LIST[0],
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
    setStatusNote('');
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* Top accent glow */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-600 via-blue-500 to-cyan-500" />

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <span>Request a Quote / Project Enquiry</span>
          <Sparkles className="w-5 h-5 text-sky-600" />
        </h3>
        <p className="text-slate-600 text-sm mt-1">
          Fill in the details below and our technical team led by Kannan R will get back to you promptly.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="py-8 text-center space-y-5"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-extrabold text-slate-900">Enquiry Submitted & Sent!</h4>
              <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                Thank you <span className="text-sky-700 font-bold">{formData.fullName}</span>. Your requirement for <span className="text-slate-900 font-semibold">{formData.serviceRequired}</span> has been dispatched to <span className="text-slate-900 font-bold">{COMPANY_DETAILS.email}</span> and logged in the RK ENGINEERING Admin portal.
              </p>
            </div>

            {statusNote && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-800 text-xs font-semibold">
                <MailCheck className="w-4 h-4 text-sky-600" />
                <span>{statusNote}</span>
              </div>
            )}

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${COMPANY_DETAILS.phoneRaw}?text=${encodeURIComponent(
                  `Hello RK ENGINEERING, I have submitted an enquiry for ${formData.serviceRequired}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="sm">
                  Quick WhatsApp Confirmation
                </Button>
              </a>
              <Button variant="secondary" size="sm" onClick={resetForm}>
                Submit Another Enquiry
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-sky-600">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Rajesh Kumar"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 border ${
                    errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-sky-500'
                  } focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all text-sm`}
                />
                {errors.fullName && (
                  <p className="text-red-600 text-xs mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Company / Organization
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g. Industrial Plant Pvt Ltd"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-200 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Phone Number <span className="text-sky-600">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 border ${
                    errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-sky-500'
                  } focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all text-sm`}
                />
                {errors.phone && (
                  <p className="text-red-600 text-xs mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-sky-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 border ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-sky-500'
                  } focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all text-sm`}
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Service Required */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Service Required <span className="text-sky-600">*</span>
              </label>
              <select
                name="serviceRequired"
                value={formData.serviceRequired}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-900 border border-slate-200 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all text-sm"
              >
                {SERVICES_LIST.map((srv, idx) => (
                  <option key={idx} value={srv} className="bg-white text-slate-900">
                    {srv}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Requirement Details <span className="text-sky-600">*</span>
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your site requirement, manpower needed, or scope of work..."
                className={`w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 border ${
                  errors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-sky-500'
                } focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all text-sm resize-none`}
              />
              {errors.message && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={isSubmitting}
                icon={isSubmitting ? Loader2 : Send}
              >
                {isSubmitting ? 'Sending Enquiry...' : 'Send Project Enquiry'}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
