
import React from 'react';
import { LOGO_URL } from '../constants';

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const dimensions = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-32 h-32'
  };

  return (
    <div className={`flex items-center gap-2 ${size === 'lg' ? 'flex-col' : ''}`}>
      <div className={`${dimensions[size]} relative overflow-hidden`}>
        <img 
          src={LOGO_URL} 
          alt="Find Recycler Logo" 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className={`font-bold tracking-tight text-green-900 dark:text-green-100 ${size === 'lg' ? 'text-4xl mt-4' : 'text-xl'}`}>
        Find <span className="text-green-600 dark:text-green-400">Recycler</span><span className="text-green-400 dark:text-green-500 font-light">.</span>
      </div>
    </div>
  );
};

export default Logo;
