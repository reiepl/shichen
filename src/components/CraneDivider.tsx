import { motion } from 'motion/react';

export const CraneDivider = () => (
  <div className="relative py-8 flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div className="w-full border-t border-celadon-jade/20" />
    </div>
    <div className="relative bg-celadon-bg px-4">
      <svg 
        width="48" 
        height="24" 
        viewBox="0 0 48 24" 
        fill="none" 
        className="text-celadon-jade"
      >
        <motion.path 
          d="M4 12 Q12 4 24 12 T44 12" 
          stroke="currentColor" 
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <path 
          d="M20 12 L24 8 L28 12 L24 16 Z" 
          fill="currentColor" 
          opacity="0.6"
        />
      </svg>
    </div>
  </div>
);
