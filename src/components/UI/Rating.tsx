import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({ 
  rating, 
  size = 'md', 
  showNumber = true, 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= Math.round(rating)
                ? 'text-accent-yellow fill-accent-yellow'
                : 'text-gray-600'
            }`}
          />
        ))}
      </div>
      {showNumber && (
        <span className={`${textSizeClasses[size]} text-gray-300 font-medium`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};
