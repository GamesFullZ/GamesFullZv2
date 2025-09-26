import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  icon?: LucideIcon;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  icon: Icon,
  className = '',
  type = 'button',
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden';
  
  const variantClasses = {
    primary: 'bg-gradient-neon text-white hover:shadow-lg hover:shadow-neon-blue/25 hover:scale-105',
    secondary: 'bg-dark-tertiary text-white hover:bg-dark-secondary border border-neon-blue/20 hover:border-neon-blue/40',
    outline: 'border-2 border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-dark-primary',
    ghost: 'text-neon-blue hover:bg-neon-blue/10',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const disabledClasses = 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? disabledClasses : ''} ${className}`}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />}
      <span className="relative z-10">{children}</span>
      
      {!disabled && variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.button>
  );
};
