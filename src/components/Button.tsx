import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  children,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500/50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer min-h-[44px]';

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:from-sky-500 hover:to-blue-500 border border-sky-400/30',
    secondary:
      'bg-slate-100 text-slate-800 border border-slate-200/90 hover:bg-slate-200/80 hover:border-slate-300 shadow-xs hover:text-slate-900',
    outline:
      'bg-white text-sky-700 border border-sky-200/90 hover:bg-sky-50 hover:border-sky-400 hover:text-sky-800 shadow-xs',
    whatsapp:
      'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 border border-emerald-400/30',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs tracking-wide',
    md: 'px-5 py-2.5 text-sm tracking-wide',
    lg: 'px-7 py-3.5 text-base font-semibold tracking-wide',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className={`w-4 h-4 mr-2 transition-transform group-hover:-translate-x-0.5`} />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className={`w-4 h-4 ml-2 transition-transform group-hover:translate-x-1`} />
      )}
    </motion.button>
  );
};
