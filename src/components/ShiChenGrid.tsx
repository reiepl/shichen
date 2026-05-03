import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SHI_CHEN = [
  { name: 'Zi 子', time: '23:00-01:00', element: 'Water' },
  { name: 'Chou 丑', time: '01:00-03:00', element: 'Earth' },
  { name: 'Yin 寅', time: '03:00-05:00', element: 'Wood' },
  { name: 'Mao 卯', time: '05:00-07:00', element: 'Wood' },
  { name: 'Chen 辰', time: '07:00-09:00', element: 'Earth' },
  { name: 'Si 巳', time: '09:00-11:00', element: 'Fire' },
  { name: 'Wu 午', time: '11:00-13:00', element: 'Fire' },
  { name: 'Wei 未', time: '13:00-15:00', element: 'Earth' },
  { name: 'Shen 申', time: '15:00-17:00', element: 'Metal' },
  { name: 'You 酉', time: '17:00-19:00', element: 'Metal' },
  { name: 'Xu 戌', time: '19:00-21:00', element: 'Earth' },
  { name: 'Hai 亥', time: '21:00-23:00', element: 'Water' },
];

export const ShiChenGrid = () => {
  // Simple check for current Shi Chen
  const now = new Date();
  const hour = now.getHours();
  let currentIdx = Math.floor(((hour + 1) % 24) / 2);

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
      {SHI_CHEN.map((shi, idx) => (
        <div 
          key={shi.name}
          className={cn(
            "p-3 rounded-md border transition-all duration-300",
            idx === currentIdx 
              ? "bg-celadon-jade text-white border-celadon-jade shadow-md scale-[1.02]" 
              : "bg-white border-celadon-jade-light/40 hover:border-celadon-jade/40"
          )}
        >
          <div className="text-xs opacity-60 font-sans pb-1">{shi.time}</div>
          <div className="text-base font-serif font-medium">{shi.name}</div>
          <div className={cn(
            "text-[10px] mt-1 px-1 rounded inline-block",
            idx === currentIdx ? "bg-white/20" : "bg-celadon-bg text-celadon-jade/60"
          )}>
            {shi.element}
          </div>
        </div>
      ))}
    </div>
  );
};
