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
import { cn } from '../lib/utils';

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
  const { selectedDate: rawSelectedDate, setSelectedDate, activeStar, activePurpose, userBirthData } = useStore();
  const selectedDate = useMemo(() => new Date(rawSelectedDate), [rawSelectedDate]);

  const userDayBranch = useMemo(() => {
    if (!userBirthData) return null;
    const userDate = new Date(userBirthData.birthYear, userBirthData.birthMonth - 1, userBirthData.birthDay, userBirthData.birthHour);
    const p = almanac.getPillars(userDate);
    return p.day.branch;
  }, [userBirthData]);

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
          const dayBranch = lunar.ganZhi.substring(1, 2);
          const dayStem = lunar.ganZhi.substring(0, 1);
          const stemColor = STEM_COLORS[dayStem] || 'text-celadon-jade';

          const hasStarFilter = !!activeStar;
          const hasPurposeFilter = !!activePurpose;

          const starMatch = !hasStarFilter || (
            activeStar === 'tian-yi' ? lunar.isHeavenlyNoble : lunar.isHeavenlyVirtue
          );

          const purposeMatch = !hasPurposeFilter || (
            activePurpose === 'helpful-people' 
              ? (userDayBranch && almanac.getTripleHarmony(userDayBranch).includes(dayBranch))
              : (userDayBranch && almanac.getSixHarmony(userDayBranch) === dayBranch)
          );

          const isMatch = (hasStarFilter || hasPurposeFilter) && starMatch && purposeMatch;
          const isDimmed = (hasStarFilter || hasPurposeFilter) && !isMatch;

          return (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={cn(
                "relative flex flex-col items-center justify-between py-2 border-r border-b border-celadon-jade/5 transition-all group min-h-[100px]",
                (!isCurrentMonth || isDimmed) && "opacity-40 grayscale-[0.5]",
                isSelected ? "bg-celadon-jade-light/10" : "bg-white hover:bg-celadon-bg/50",
                isMatch && "ring-2 ring-inset ring-celadon-jade/40 bg-celadon-jade/5 z-10 scale-[1.02] shadow-xl",
                isMatch && hasStarFilter && activeStar === 'tian-yi' && "ring-celadon-gold/50 bg-celadon-gold/5"
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
                <div className="flex items-center text-[11px] font-serif font-medium">
                  <span className={stemColor}>{dayStem}</span>
                  <span className={cn(
                    hasPurposeFilter && purposeMatch ? "bg-celadon-jade text-white px-0.5 rounded ml-0.5" : "text-celadon-ink/70"
                  )}>
                    {dayBranch}
                  </span>
                </div>
                <span className="text-[10px] text-celadon-jade font-sans px-0.5 rounded bg-celadon-jade/5 border border-celadon-jade/10">
                  {lunar.officer}
                </span>
              </div>

              {/* Tags (Virtue / Noble) */}
              <div className="flex flex-col items-center space-y-0.5 min-h-[28px] justify-center">
                {lunar.isHeavenlyVirtue && (
                  <div className={cn(
                    "text-[9px] px-1 rounded border leading-tight transition-all",
                    activeStar === 'tian-de' ? "bg-celadon-jade text-white border-celadon-jade" : "bg-celadon-jade/10 text-celadon-jade border-celadon-jade/20"
                  )}>
                    天德
                  </div>
                )}
                {lunar.isHeavenlyNoble && (
                  <div className={cn(
                    "text-[9px] px-1 rounded border leading-tight transition-all",
                    activeStar === 'tian-yi' ? "bg-celadon-gold text-white border-celadon-gold" : "bg-celadon-gold/10 text-celadon-gold border-celadon-gold/20"
                  )}>
                    天乙
                  </div>
                )}
              </div>

              {/* Auspiciousness Dot (●) */}
              <div className="h-2 flex items-center justify-center">
                 {lunar.yi.length > 5 && (
                   <div className={cn(
                     "w-1.5 h-1.5 rounded-full transition-all",
                     lunar.yi.length > 15 || isMatch ? "bg-celadon-jade shadow-[0_0_8px_rgba(74,130,110,0.8)] scale-125" : "bg-celadon-jade/30"
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
