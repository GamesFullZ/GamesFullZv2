import React from 'react';
import { motion } from 'framer-motion';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-2 border-neon-blue/20 border-t-neon-blue rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-dark-secondary rounded-xl overflow-hidden animate-pulse">
      <div className="h-48 bg-dark-tertiary"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-dark-tertiary rounded w-3/4"></div>
        <div className="h-3 bg-dark-tertiary rounded w-1/2"></div>
        <div className="flex justify-between">
          <div className="h-3 bg-dark-tertiary rounded w-1/4"></div>
          <div className="h-3 bg-dark-tertiary rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};
