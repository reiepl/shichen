import { motion } from 'motion/react';

interface ScoreRingProps {
  score: number;
}

export const ScoreRing = ({ score }: ScoreRingProps) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      <svg className="w-full h-full transform -rotate-90">
        {/* Background track */}
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-celadon-jade-light/20"
        />
        {/* Score progress */}
        <motion.circle
          cx="48"
          cy="48"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-celadon-jade"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-serif text-celadon-ink leading-none">{score}</span>
        <span className="text-[10px] text-celadon-jade/60 uppercase tracking-tighter">Harmony</span>
      </div>
    </div>
  );
};
