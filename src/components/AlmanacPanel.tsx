import { useMemo } from 'react';
import { useStore } from '../store';
import { almanac, calcPersonalScore } from '../lib/stemBranchAdapter';
import { CalendarBanner } from './CalendarBanner';
import { ScoreRing } from './ScoreRing';
import { ShiChenGrid } from './ShiChenGrid';
import { CalendarGrid } from './CalendarGrid';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Info, Heart } from 'lucide-react';

export const AlmanacPanel = () => {
  const { selectedDate: rawSelectedDate, setSelectedDate, userBirthData } = useStore();
  
  const selectedDate = useMemo(() => new Date(rawSelectedDate), [rawSelectedDate]);
  
  const dayPillars = useMemo(() => almanac.getPillars(selectedDate), [selectedDate]);
  const lunarInfo = useMemo(() => almanac.getLunarInfo(selectedDate), [selectedDate]);
  
  const userPillars = useMemo(() => {
    if (!userBirthData) return null;
    const date = new Date(
      userBirthData.birthYear, 
      userBirthData.birthMonth - 1, 
      userBirthData.birthDay, 
      userBirthData.birthHour
    );
    return almanac.getPillars(date);
  }, [userBirthData]);

  const score = useMemo(() => {
    if (!userPillars) return null;
    return calcPersonalScore(userPillars, dayPillars);
  }, [userPillars, dayPillars]);

  const changeMonth = (months: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + months);
    setSelectedDate(newDate);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with Navigation */}
      <div className="p-4 bg-white border-b border-celadon-jade/10 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => changeMonth(-1)}
              className="p-1.5 hover:bg-celadon-jade/10 rounded-full text-celadon-jade transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-serif text-celadon-ink min-w-[140px] text-center">
              {format(selectedDate, 'MMMM yyyy')}
            </h2>
            <button 
              onClick={() => changeMonth(1)}
              className="p-1.5 hover:bg-celadon-jade/10 rounded-full text-celadon-jade transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setSelectedDate(new Date())}
            className="text-[10px] uppercase tracking-widest text-celadon-jade font-medium bg-celadon-jade-light/10 px-4 py-1.5 rounded-full hover:bg-celadon-jade-light/20 transition-colors"
          >
            Today
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 lg:flex-row overflow-hidden">
        {/* Main Grid View */}
        <div className="flex-1 border-r border-celadon-jade/10 overflow-hidden flex flex-col">
          <CalendarGrid />
        </div>

        {/* Selected Day Side Panel */}
        <div className="w-full lg:w-[380px] bg-white overflow-y-auto p-6 space-y-6">
          <CalendarBanner />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-serif text-celadon-ink">{format(selectedDate, 'do MMMM')}</h3>
                <p className="text-xs text-celadon-jade/60 font-sans tracking-wide">{lunarInfo.ganZhi} Day • {lunarInfo.zodiac} Year</p>
              </div>
              {score !== null && (
                <div className="flex flex-col items-center">
                   <div className="text-[10px] uppercase tracking-tighter text-celadon-jade/40 mb-1">Match</div>
                   <div className="w-10 h-10 rounded-full border border-celadon-jade/20 flex items-center justify-center">
                     <span className="text-sm font-serif">{score}</span>
                   </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
               <div className="p-3 bg-celadon-bg rounded-lg border border-celadon-jade-light/20">
                 <div className="text-[9px] uppercase tracking-widest text-celadon-jade/50 mb-1">Lunar Date</div>
                 <div className="text-lg font-serif">{lunarInfo.monthStr} {lunarInfo.dayStr}</div>
               </div>
               <div className="p-3 bg-celadon-bg rounded-lg border border-celadon-jade-light/20">
                 <div className="text-[9px] uppercase tracking-widest text-celadon-jade/50 mb-1">Current Shi</div>
                 <div className="text-lg font-serif">
                   {almanac.getPillars(new Date()).hour.branch} Time
                 </div>
               </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 border border-celadon-jade-light/40 rounded-xl space-y-3">
                <div className="flex items-center space-x-2 text-celadon-jade">
                  <Heart className="w-4 h-4 fill-current" />
                  <span className="text-xs font-serif italic">Auspicious Activities (宜)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {lunarInfo.yi.slice(0, 8).map(y => (
                    <span key={y} className="text-[11px] bg-celadon-jade/5 text-celadon-jade px-2 py-0.5 rounded border border-celadon-jade/10">
                      {y}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 border border-celadon-vermilion/20 rounded-xl space-y-3">
                <div className="flex items-center space-x-2 text-celadon-vermilion opacity-70">
                  <Info className="w-4 h-4" />
                  <span className="text-xs font-serif italic">To Avoid (忌)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {lunarInfo.ji.slice(0, 6).map(j => (
                    <span key={j} className="text-[11px] bg-celadon-vermilion/5 text-celadon-vermilion px-2 py-0.5 rounded border border-celadon-vermilion/10">
                      {j}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-celadon-jade-light/20">
             <h4 className="text-xs uppercase tracking-widest text-celadon-jade/60 font-sans mb-4">Daily Precision Cycle</h4>
             <ShiChenGrid />
          </div>
        </div>
      </div>
    </div>
  );
};
