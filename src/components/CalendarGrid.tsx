import { useMemo } from 'react';
import { useStore } from '../store';
import { almanac } from '../lib/stemBranchAdapter';
import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  format, 
  isSameDay, 
  startOfWeek, 
  endOfWeek 
} from 'date-fns';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ZODIAC_EMOJI: Record<string, string> = {
  '鼠': '🐭', '牛': '🐮', '虎': '🐯', '兔': '🐰', '龙': '🐲', '蛇': '🐍',
  '马': '🐴', '羊': '🐏', '猴': '🐵', '鸡': '🐔', '狗': '🐶', '猪': '🐷'
};

const STEM_COLORS: Record<string, string> = {
  '甲': 'text-green-700', '乙': 'text-green-600',
  '丙': 'text-red-600', '丁': 'text-red-500',
  '戊': 'text-amber-700', '己': 'text-amber-600',
  '庚': 'text-slate-500', '辛': 'text-slate-400',
  '壬': 'text-blue-700', '癸': 'text-blue-600'
};

export const CalendarGrid = () => {
  const { selectedDate: rawSelectedDate, setSelectedDate, showTianYi, showTianDe } = useStore();
  const selectedDate = useMemo(() => new Date(rawSelectedDate), [rawSelectedDate]);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(selectedDate));
    const end = endOfWeek(endOfMonth(selectedDate));
    return eachDayOfInterval({ start, end });
  }, [selectedDate]);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="grid grid-cols-7 border-b border-celadon-jade/10">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="py-2 text-center text-[10px] uppercase tracking-widest text-celadon-jade/40 font-sans">
            {d}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 flex-1 overflow-y-auto">
        {days.map((date) => {
          const isSelected = isSameDay(date, selectedDate);
          const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
          const lunar = almanac.getLunarInfo(date);
          const stem = lunar.ganZhi.substring(0, 1);
          const stemColor = STEM_COLORS[stem] || 'text-celadon-jade';

          return (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={cn(
                "relative flex flex-col items-center justify-between py-2 border-r border-b border-celadon-jade/5 transition-all group min-h-[100px]",
                !isCurrentMonth && "opacity-20",
                isSelected ? "bg-celadon-jade-light/10" : "bg-white hover:bg-celadon-bg/50"
              )}
            >
              {/* Gregorian Day (16px, ink black) */}
              <span className={cn(
                "text-[16px] font-sans font-medium",
                isSelected ? "text-celadon-jade" : "text-celadon-ink"
              )}>
                {format(date, 'd')}
              </span>

              {/* Lunar Info (11px, soft charcoal) */}
              <div className="flex flex-col items-center">
                {lunar.isFirstDay ? (
                  <span className="text-[11px] font-sans font-bold text-gray-600 leading-none">
                    {lunar.monthStr}
                  </span>
                ) : (
                  <span className="text-[11px] font-sans text-gray-500 leading-none">
                    {lunar.dayStr}
                  </span>
                )}
              </div>

              {/* GanZhi (11px, element-colored) + Officer */}
              <div className="flex items-center space-x-1">
                <span className={cn("text-[11px] font-serif font-medium", stemColor)}>
                  {lunar.ganZhi.substring(0, 2)}
                </span>
                <span className="text-[10px] text-celadon-jade font-sans px-0.5 rounded bg-celadon-jade/5 border border-celadon-jade/10">
                  {lunar.officer}
                </span>
              </div>

              {/* Tags (Virtue / Noble) */}
              <div className="flex flex-col items-center space-y-0.5 min-h-[28px] justify-center">
                {(showTianDe && lunar.isHeavenlyVirtue) && (
                  <div className="text-[9px] bg-celadon-jade/10 text-celadon-jade px-1 rounded border border-celadon-jade/20 leading-tight">
                    天德
                  </div>
                )}
                {(showTianYi && lunar.isHeavenlyNoble) && (
                  <div className="text-[9px] bg-celadon-gold/10 text-celadon-gold px-1 rounded border border-celadon-gold/20 leading-tight">
                    天乙
                  </div>
                )}
              </div>

              {/* Auspiciousness Dot (●) */}
              <div className="h-2 flex items-center justify-center">
                 {lunar.yi.length > 5 && (
                   <div className={cn(
                     "w-1.5 h-1.5 rounded-full",
                     lunar.yi.length > 15 ? "bg-celadon-jade shadow-[0_0_4px_rgba(74,130,110,0.5)]" : "bg-celadon-jade/30"
                   )} />
                 )}
              </div>

              {isSelected && (
                <div className="absolute top-0 inset-x-0 h-0.5 bg-celadon-jade" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
