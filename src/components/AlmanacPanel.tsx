import { useMemo } from 'react';
import { useStore } from '../store';
import { almanac, calcPersonalScore } from '../lib/stemBranchAdapter';
import { CalendarBanner } from './CalendarBanner';
import { ShiChenGrid } from './ShiChenGrid';
import { CalendarGrid } from './CalendarGrid';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Info, Heart, Menu } from 'lucide-react';
import { cn } from '../lib/utils';

export const AlmanacPanel = () => {
  const { 
    selectedDate: rawSelectedDate, 
    setSelectedDate, 
    userBirthData, 
    isPersonalMode, 
    setPersonalMode,
    activeStar,
    activePurpose,
    setStarHighlight,
    setPurposeHighlight,
    isProfileOpen,
    setProfileOpen
  } = useStore();
  
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
    if (!userPillars || !isPersonalMode) return null;
    return calcPersonalScore(userPillars, dayPillars);
  }, [userPillars, dayPillars, isPersonalMode]);

  const changeMonth = (months: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + months);
    setSelectedDate(newDate);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Global Header */}
      <div className="h-14 px-4 bg-white border-b border-celadon-jade/10 flex items-center justify-between z-30">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setProfileOpen(!isProfileOpen)}
            className="p-2 hover:bg-celadon-jade/5 rounded-md text-celadon-jade transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-serif text-celadon-ink min-w-[140px]">
              {format(selectedDate, 'MMMM yyyy')}
            </h2>
            <div className="flex items-center bg-celadon-bg rounded-full p-0.5 border border-celadon-jade/10">
              <button 
                onClick={() => changeMonth(-1)}
                className="p-1 hover:bg-celadon-jade/10 rounded-full text-celadon-jade transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => changeMonth(1)}
                className="p-1 hover:bg-celadon-jade/10 rounded-full text-celadon-jade transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-3 text-xs border-l border-celadon-jade/10 pl-4 ml-2">
            <span className="text-celadon-jade/40 font-serif">【{lunarInfo.zodiac}年】</span>
            <div className="flex space-x-3 font-serif font-medium">
              <span className="text-celadon-ink/80">{lunarInfo.ganZhi.substring(0, 2)}年</span>
              <span className="text-celadon-ink/80">{lunarInfo.monthStr}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-celadon-bg p-1 rounded-full border border-celadon-jade/10">
            <button 
              onClick={() => setPersonalMode(false)}
              className={cn(
                "px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold transition-all",
                !isPersonalMode ? "bg-white text-celadon-jade shadow-sm" : "text-celadon-ink/40"
              )}
            >
              General
            </button>
            <button 
              onClick={() => {
                if (userBirthData) setPersonalMode(true);
              }}
              disabled={!userBirthData}
              className={cn(
                "px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold transition-all disabled:opacity-50",
                isPersonalMode ? "bg-celadon-jade text-white shadow-sm" : "text-celadon-ink/40"
              )}
            >
              Bazi
            </button>
          </div>
          
          <button 
            onClick={() => setSelectedDate(new Date())}
            className="text-[9px] uppercase tracking-widest text-celadon-jade font-bold bg-celadon-jade-light/10 px-4 py-2 rounded-full hover:bg-celadon-jade-light/20 transition-colors"
          >
            Today
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Center Area: Grid + Hourly */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-celadon-jade/10 overflow-hidden">
          {/* Filters Bar */}
          <div className="px-6 py-2.5 bg-celadon-bg/20 border-b border-celadon-jade/5 flex flex-wrap items-center gap-6 overflow-x-auto no-scrollbar">
            <div className="flex items-center space-x-3 shrink-0">
              <span className="text-[10px] uppercase tracking-widest text-celadon-jade/40 font-bold">Stars</span>
              <div className="flex items-center space-x-1.5">
                {[
                  { id: 'tian-yi', label: '天乙' },
                  { id: 'tian-de', label: '天德' }
                ].map(star => (
                  <button
                    key={star.id}
                    onClick={() => setStarHighlight(activeStar === star.id ? null : star.id)}
                    className={cn(
                      "px-3 py-1 rounded-full text-[9px] font-bold border transition-all uppercase tracking-tighter",
                      activeStar === star.id 
                        ? "bg-celadon-gold text-white border-celadon-gold shadow-md" 
                        : "bg-white text-celadon-ink/60 border-celadon-jade/10 hover:border-celadon-gold/30 hover:text-celadon-gold"
                    )}
                  >
                    {star.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <span className="text-[10px] uppercase tracking-widest text-celadon-jade/40 font-bold">Purpose</span>
              <div className="flex items-center space-x-1.5">
                {[
                  { id: 'helpful-people', label: 'Helpful People', disabled: !userBirthData },
                  { id: 'harmony', label: 'Harmony', disabled: !userBirthData }
                ].map(p => (
                  <button
                    key={p.id}
                    disabled={p.disabled}
                    onClick={() => setPurposeHighlight(activePurpose === p.id ? null : p.id)}
                    className={cn(
                      "px-3 py-1 rounded-full text-[9px] font-bold border transition-all relative overflow-hidden group uppercase tracking-widest",
                      activePurpose === p.id 
                        ? "bg-celadon-jade text-white border-celadon-jade shadow-md" 
                        : "bg-white text-celadon-ink/60 border-celadon-jade/10 hover:border-celadon-jade/30 hover:text-celadon-jade",
                      p.disabled && "opacity-40 cursor-not-allowed grayscale"
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar bg-celadon-bg/5">
            <div className="p-4 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-celadon-jade/5 overflow-hidden">
                <CalendarGrid />
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-celadon-jade/5 overflow-hidden p-4">
                <div className="flex items-center justify-between mb-4">
                   <h4 className="text-xs uppercase tracking-widest text-celadon-jade/60 font-bold">Hourly Timeline</h4>
                   <div className="flex items-center space-x-2 text-[10px] text-celadon-ink/40 italic">
                      <Info className="w-3 h-3" />
                      <span>{format(selectedDate, 'do MMMM yyyy')}</span>
                   </div>
                </div>
                <ShiChenGrid />
              </div>
            </div>
          </div>
        </div>

        {/* Selected Day Right Side Panel */}
        <div className="hidden xl:block w-[340px] bg-white overflow-y-auto custom-scrollbar p-6 space-y-6 shrink-0">
          <CalendarBanner />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-serif text-celadon-ink">{format(selectedDate, 'do MMMM')}</h3>
                <p className="text-xs text-celadon-jade/60 font-sans tracking-wide">
                  {lunarInfo.ganZhi} Day • <span className="text-celadon-ink/80">{lunarInfo.zodiac} Year</span>
                </p>
              </div>
              {isPersonalMode && score !== null && (
                <div className="flex flex-col items-center">
                   <div className="text-[10px] uppercase tracking-tighter text-celadon-jade/40 mb-1 font-bold">Harmony</div>
                   <div className="w-10 h-10 rounded-full border border-celadon-jade bg-celadon-jade/5 flex items-center justify-center">
                     <span className="text-sm font-serif text-celadon-jade font-bold">{score}</span>
                   </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
               <div className="p-3 bg-celadon-bg/50 rounded-lg border border-celadon-jade-light/20">
                 <div className="text-[9px] uppercase tracking-widest text-celadon-jade/50 mb-1 font-bold">Lunar Date</div>
                 <div className="text-base font-serif">{lunarInfo.monthStr} {lunarInfo.dayStr}</div>
               </div>
               <div className="p-3 bg-celadon-bg/50 rounded-lg border border-celadon-jade-light/20">
                 <div className="text-[9px] uppercase tracking-widest text-celadon-jade/50 mb-1 font-bold">Current Shi</div>
                 <div className="text-base font-serif">
                   {almanac.getPillars(new Date()).hour.branch} Time
                 </div>
               </div>
            </div>
            
            {isPersonalMode && score !== null && (
              <div className="p-4 bg-celadon-jade/10 border border-celadon-jade/20 rounded-xl">
                 <div className="flex items-center space-x-2 text-celadon-jade mb-1">
                    <Heart className="w-3 h-3 fill-current" />
                    <span className="text-[9px] uppercase tracking-widest font-sans font-bold">Personal Harmony</span>
                 </div>
                 <p className="text-[11px] text-celadon-ink/80 font-serif leading-relaxed">
                   {score >= 80 ? 'Exceptionally well' : score >= 60 ? 'Favorably' : 'Neutrally'} aligned with your Day Master. 
                 </p>
              </div>
            )}

            <div className="space-y-3">
              <div className="p-4 border border-celadon-jade-light/40 rounded-xl space-y-3">
                <div className="flex items-center space-x-2 text-celadon-jade">
                  <Heart className="w-4 h-4 fill-current" />
                  <span className="text-xs font-serif italic font-bold">Auspicious (宜)</span>
                </div>
                <div className="flex flex-wrap gap-2 text-[10px]">
                  {lunarInfo.yi.slice(0, 10).map(y => (
                    <span key={y} className="text-celadon-jade px-2 py-0.5 rounded-full bg-celadon-jade/5 border border-celadon-jade/10">
                      {y}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 border border-celadon-vermilion/20 rounded-xl space-y-3">
                <div className="flex items-center space-x-2 text-celadon-vermilion opacity-70">
                  <Info className="w-4 h-4" />
                  <span className="text-xs font-serif italic font-bold">To Avoid (忌)</span>
                </div>
                <div className="flex flex-wrap gap-2 text-[10px]">
                  {lunarInfo.ji.slice(0, 6).map(j => (
                    <span key={j} className="text-celadon-vermilion px-2 py-0.5 rounded-full bg-celadon-vermilion/5 border border-celadon-vermilion/10">
                      {j}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

