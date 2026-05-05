import { useState, useMemo } from 'react';
import { useStore } from '../store';
import { almanac } from '../lib/stemBranchAdapter';
import { Bell, Heart, Info } from 'lucide-react';
import { cn } from '../lib/utils';

export const ShiChenGrid = () => {
  const { selectedDate: rawSelectedDate } = useStore();
  const selectedDate = useMemo(() => new Date(rawSelectedDate), [rawSelectedDate]);
  
  const dayPillars = useMemo(() => almanac.getPillars(selectedDate), [selectedDate]);
  const hourlyData = useMemo(() => {
    return almanac.getHourlyInfo(
      selectedDate, 
      dayPillars.day.stem, 
      dayPillars.day.branch, 
      dayPillars.month.branch
    );
  }, [selectedDate, dayPillars]);

  // Find current hour index to highlight
  const now = new Date();
  const currentHour = now.getHours();
  const currentIdx = Math.floor(((currentHour + 1) % 24) / 2);
  
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const selectedHour = selectedIdx !== null ? hourlyData[selectedIdx] : null;

  return (
    <div className="space-y-6">
      {/* 12-Hour Grid */}
      <div className="border border-celadon-jade/10 rounded-lg overflow-hidden bg-celadon-bg/20">
        <div className="grid grid-cols-6 border-b border-celadon-jade/10">
          {hourlyData.slice(0, 6).map((h, i) => (
            <HourCell 
              key={h.branch} 
              hour={h} 
              isSelected={selectedIdx === i} 
              isCurrent={i === currentIdx}
              onClick={() => setSelectedIdx(selectedIdx === i ? null : i)}
            />
          ))}
        </div>
        <div className="grid grid-cols-6">
          {hourlyData.slice(6, 12).map((h, i) => (
            <HourCell 
              key={h.branch} 
              hour={h} 
              isSelected={selectedIdx === i + 6} 
              isCurrent={i + 6 === currentIdx}
              onClick={() => setSelectedIdx(selectedIdx === i + 6 ? null : i + 6)}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 py-2 border-b border-celadon-jade/5">
        <div className="flex items-center space-x-1.5">
          <span className="text-[10px] font-sans text-celadon-jade font-bold">贵</span>
          <span className="text-[9px] text-celadon-ink/40">= 天乙贵人</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="text-[10px] font-sans text-celadon-gold font-bold">德</span>
          <span className="text-[9px] text-celadon-ink/40">= 天德</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 rounded-full bg-celadon-jade" />
            <span className="text-[9px] text-celadon-ink/40">= Good</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 rounded-full border border-celadon-jade/30" />
            <span className="text-[9px] text-celadon-ink/40">= Neutral</span>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedHour && (
        <div className="celadon-card p-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-serif text-celadon-ink">{selectedHour.name}</h3>
                <span className="text-xs text-celadon-jade/60 font-sans tracking-wide">{selectedHour.range}</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm font-serif text-celadon-jade font-medium">{selectedHour.ganZhi}</span>
                <span className="text-[10px] text-celadon-ink/40 font-sans px-1.5 py-0.5 bg-celadon-bg rounded">{selectedHour.nayin}</span>
              </div>
            </div>
            <button className="p-2 hover:bg-celadon-jade/10 rounded-full text-celadon-jade transition-colors">
              <Bell className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {selectedHour.isHeavenlyNoble && (
                   <span className="text-[10px] bg-celadon-jade/10 text-celadon-jade px-2 py-0.5 rounded border border-celadon-jade/20 font-bold">
                     ★ 天乙贵人
                   </span>
                )}
                {selectedHour.isHeavenlyVirtue && (
                   <span className="text-[10px] bg-celadon-gold/10 text-celadon-gold px-2 py-0.5 rounded border border-celadon-gold/20 font-bold">
                     ☆ 天德
                   </span>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-1.5 text-celadon-jade/60">
                   <div className="w-1 h-1 rounded-full bg-celadon-jade" />
                   <span className="text-[9px] uppercase tracking-widest font-bold font-sans">Suitable (宜)</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedHour.yi.map(y => (
                    <span key={y} className="text-[10px] text-celadon-ink/70 px-1.5 py-0.5 bg-celadon-bg rounded">{y}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-1.5 text-celadon-vermilion/60">
                   <div className="w-1 h-1 rounded-full bg-celadon-vermilion" />
                   <span className="text-[9px] uppercase tracking-widest font-bold font-sans">Avoid (忌)</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedHour.ji.map(j => (
                    <span key={j} className="text-[10px] text-celadon-ink/70 px-1.5 py-0.5 bg-celadon-bg rounded">{j}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <button className="w-full py-2 bg-celadon-jade text-white text-[10px] uppercase tracking-widest font-bold rounded-lg shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
                Set Reminder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Helper Footer */}
      {!selectedHour && (
        <div className="flex items-center justify-center text-celadon-ink/30 space-x-2 py-4">
          <Info className="w-3 h-3" />
          <span className="text-[10px] uppercase tracking-widest font-medium">Tap hour for detail & reminders</span>
        </div>
      )}
    </div>
  );
};

const HourCell = ({ 
  hour, 
  isSelected, 
  isCurrent, 
  onClick
}: { 
  hour: any, 
  isSelected: boolean, 
  isCurrent: boolean, 
  onClick: () => void,
  key?: string | number
}) => {
  const h = hour;
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-between py-3 px-1 transition-all border-r border-celadon-jade/10 last:border-r-0 min-h-[110px]",
        isSelected ? "bg-celadon-jade/5 ring-1 ring-inset ring-celadon-jade/20" : "bg-white hover:bg-celadon-bg/50",
        isCurrent && "relative after:absolute after:top-0 after:left-0 after:w-full after:h-0.5 after:bg-celadon-gold"
      )}
    >
      <div className="flex flex-col items-center space-y-0.5">
        <span className={cn(
          "text-xs font-serif font-medium",
          isCurrent ? "text-celadon-gold" : "text-celadon-ink"
        )}>{h.branch}时</span>
        <span className="text-[8px] text-celadon-ink/40 font-sans tracking-tighter">{h.range.split('-')[0]}</span>
      </div>

      <div className="flex flex-col items-center space-y-1.5 h-8 justify-center">
        <div className="flex space-x-1 min-h-[12px]">
          {h.isHeavenlyNoble && <span className="text-[9px] font-sans text-celadon-jade font-bold scale-90">贵</span>}
          {h.isHeavenlyVirtue && <span className="text-[9px] font-sans text-celadon-gold font-bold scale-90">德</span>}
        </div>
        <div className={cn(
          "w-1.5 h-1.5 rounded-full transition-all",
          h.isAuspicious ? "bg-celadon-jade shadow-[0_0_4px_rgba(74,130,110,0.4)]" : "border border-celadon-jade/30"
        )} />
      </div>
    </button>
  );
};
