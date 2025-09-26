import React, { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, containerClassName = '', className = '', ...props }, ref) => {
    return (
      <div className={`space-y-2 ${containerClassName}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
          )}
          
          <input
            ref={ref}
            className={`
              block w-full rounded-lg border border-dark-tertiary bg-dark-secondary text-white placeholder-gray-400
              focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none
              transition-all duration-300 px-4 py-3
              ${Icon ? 'pl-10' : ''}
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
