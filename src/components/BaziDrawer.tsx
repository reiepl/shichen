import { useEffect, useState } from 'react';
import { useStore } from '../store';
import { almanac, type Pillars } from '../lib/stemBranchAdapter';
import { CraneDivider } from './CraneDivider';
import { User, Calendar, Clock, Save, Edit3, Heart, Users, BookOpen } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ReferenceDictionary } from './ReferenceDictionary';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BaziDrawer = () => {
  const { userBirthData, setUserBirthData } = useStore();
  const [pillars, setPillars] = useState<Pillars | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'library'>('profile');
  const [isEditing, setIsEditing] = useState(!userBirthData);
  
  // Local form state
  const [year, setYear] = useState(userBirthData?.birthYear || 1990);
  const [month, setMonth] = useState(userBirthData?.birthMonth || 1);
  const [day, setDay] = useState(userBirthData?.birthDay || 1);
  const [hour, setHour] = useState(userBirthData?.birthHour || 12);
  const [gender, setGender] = useState<'Male' | 'Female'>('Female');

  useEffect(() => {
    if (userBirthData) {
      const date = new Date(
        userBirthData.birthYear, 
        userBirthData.birthMonth - 1, 
        userBirthData.birthDay, 
        userBirthData.birthHour
      );
      setPillars(almanac.getPillars(date));
      setIsEditing(false);
    }
  }, [userBirthData]);

  const handleSave = () => {
    setUserBirthData({
      birthYear: year,
      birthMonth: month,
      birthDay: day,
      birthHour: hour
    });
    setIsEditing(false);
  };

  return (
    <div className="h-full flex flex-col p-6 overflow-y-auto custom-scrollbar">
      {/* Tab Nav */}
      <div className="flex items-center space-x-1 bg-celadon-bg p-1 rounded-lg border border-celadon-jade/10 mb-6">
        <button 
          onClick={() => setActiveTab('profile')}
          className={cn(
            "flex-1 flex items-center justify-center space-x-2 py-2 rounded-md text-[10px] uppercase tracking-widest transition-all",
            activeTab === 'profile' ? "bg-white text-celadon-jade shadow-sm" : "text-celadon-ink/40"
          )}
        >
          <User className="w-3.5 h-3.5" />
          <span>My Profile</span>
        </button>
        <button 
          onClick={() => setActiveTab('library')}
          className={cn(
            "flex-1 flex items-center justify-center space-x-2 py-2 rounded-md text-[10px] uppercase tracking-widest transition-all",
            activeTab === 'library' ? "bg-white text-celadon-jade shadow-sm" : "text-celadon-ink/40"
          )}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Library</span>
        </button>
      </div>

      {activeTab === 'library' ? (
        <ReferenceDictionary />
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-1 duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-celadon-jade/10 flex items-center justify-center">
                <User className="w-4 h-4 text-celadon-jade" />
              </div>
              <h2 className="text-xl font-serif text-celadon-ink tracking-tight">Birth Date / Time</h2>
            </div>
            {!isEditing && userBirthData && (
              <button 
                onClick={() => setIsEditing(true)}
                className="p-1.5 hover:bg-celadon-jade/10 rounded-full text-celadon-jade transition-all"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>

      {isEditing ? (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-300">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-celadon-jade/60 font-sans block mb-1.5">Date of Origin</label>
            <div className="grid grid-cols-3 gap-2">
              <input 
                type="number" 
                value={year} 
                onChange={(e) => setYear(Number(e.target.value))}
                className="bg-white border border-celadon-jade-light/40 px-2 py-1.5 rounded text-sm focus:outline-none focus:border-celadon-jade"
                placeholder="Year"
              />
              <select 
                value={month} 
                onChange={(e) => setMonth(Number(e.target.value))}
                className="bg-white border border-celadon-jade-light/40 px-2 py-1.5 rounded text-sm focus:outline-none focus:border-celadon-jade"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <input 
                type="number" 
                value={day} 
                onChange={(e) => setDay(Number(e.target.value))}
                className="bg-white border border-celadon-jade-light/40 px-2 py-1.5 rounded text-sm focus:outline-none focus:border-celadon-jade"
                placeholder="Day"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-celadon-jade/60 font-sans block mb-1.5">Hour</label>
              <select 
                value={hour} 
                onChange={(e) => setHour(Number(e.target.value))}
                className="w-full bg-white border border-celadon-jade-light/40 px-2 py-1.5 rounded text-sm focus:outline-none focus:border-celadon-jade"
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i}>{i}:00</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-celadon-jade/60 font-sans block mb-1.5">Gender</label>
              <select 
                value={gender} 
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full bg-white border border-celadon-jade-light/40 px-2 py-1.5 rounded text-sm focus:outline-none focus:border-celadon-jade"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <button 
            onClick={handleSave}
            className="w-full bg-celadon-jade text-white py-2.5 rounded-md font-sans text-sm flex items-center justify-center space-x-2 hover:bg-celadon-jade/90 transition-all shadow-sm active:scale-[0.98]"
          >
            <Save className="w-4 h-4" />
            <span>Generate Pillars</span>
          </button>
        </div>
      ) : userBirthData ? (
        <div className="space-y-1 text-xs text-celadon-ink/70 font-sans p-3 bg-celadon-jade/5 rounded-lg border border-celadon-jade/10 animate-in fade-in duration-300">
           <div className="flex justify-between">
              <span className="text-celadon-jade/60">Born</span>
              <span className="font-medium">{userBirthData.birthYear}/{String(userBirthData.birthMonth).padStart(2, '0')}/{String(userBirthData.birthDay).padStart(2, '0')}</span>
           </div>
           <div className="flex justify-between">
              <span className="text-celadon-jade/60">Time</span>
              <span className="font-medium">{String(userBirthData.birthHour).padStart(2, '0')}:00</span>
           </div>
           <div className="flex justify-between">
              <span className="text-celadon-jade/60">Gender</span>
              <span className="font-medium">{gender}</span>
           </div>
        </div>
      ) : null}

      <CraneDivider />

      {pillars ? (
        <div className="flex-1 space-y-6 animate-in slide-in-from-bottom-2 duration-500">
          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-celadon-jade/60 font-sans mb-3 text-center italic">八字 Eight Characters</h3>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Hour', p: pillars.hour },
                { label: 'Day', p: pillars.day, highlight: true },
                { label: 'Month', p: pillars.month },
                { label: 'Year', p: pillars.year }
              ].map(({ label, p, highlight }) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="text-[8px] uppercase tracking-tighter text-celadon-jade/40 mb-1.5">{label}</span>
                  <div className={cn(
                    "flex flex-col space-y-1 p-1 rounded-sm border transition-colors",
                    highlight ? "bg-celadon-jade/5 border-celadon-jade/20" : "border-transparent"
                  )}>
                    <div className={cn(
                      "w-10 h-10 celadon-card flex items-center justify-center text-2xl font-serif",
                      highlight ? "text-celadon-jade border-celadon-jade/30" : "text-celadon-ink"
                    )}>
                      {p.stem}
                    </div>
                    <div className={cn(
                      "w-10 h-10 celadon-card flex items-center justify-center text-2xl font-serif",
                      highlight ? "text-celadon-jade border-celadon-jade/30" : "text-celadon-ink"
                    )}>
                      {p.branch}
                    </div>
                  </div>
                  {highlight && <div className="text-[8px] text-celadon-jade font-serif mt-1">日主</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Personal Development Section */}
          <div className="space-y-3">
             <div className="flex items-center space-x-2 border-b border-celadon-jade/10 pb-1">
                <Users className="w-3.5 h-3.5 text-celadon-jade" />
                <h3 className="text-sm font-serif text-celadon-ink">Personal Development</h3>
             </div>
             
             <div className="celadon-card p-4 space-y-4 bg-white border-celadon-jade/10">
                <div className="flex justify-between items-center border-b border-celadon-jade/5 pb-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-celadon-ink uppercase tracking-tight">三合 Helpful People</span>
                    <span className="text-[8px] text-celadon-ink/40 font-sans">Nobleman Allies</span>
                  </div>
                  <span className="text-[12px] font-serif text-celadon-jade">
                    {almanac.getTripleHarmony(pillars.day.branch)
                      .filter((b: string) => b !== pillars.day.branch)
                      .map((b: string) => `${b} ${almanac.BRANCH_EN[b]}`)
                      .join(' · ')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-celadon-vermilion uppercase tracking-tight">六合 Harmony</span>
                    <span className="text-[8px] text-celadon-vermilion/40 font-sans">Affinity Partner</span>
                  </div>
                  <span className="text-[12px] font-serif text-celadon-vermilion">
                    {almanac.getSixHarmony(pillars.day.branch)} {almanac.BRANCH_EN[almanac.getSixHarmony(pillars.day.branch)]}
                  </span>
                </div>
             </div>
          </div>
          
          <div className="p-4 rounded-lg bg-celadon-jade/5 border border-celadon-jade/10">
            <h3 className="text-[10px] uppercase tracking-widest text-celadon-jade mb-3 flex items-center space-x-2">
              <div className="w-1 h-1 bg-celadon-jade rotate-45" />
              <span>Metaphysical Summary</span>
            </h3>
            <div className="space-y-2.5">
               <div className="flex justify-between text-xs border-b border-celadon-jade/5 pb-1">
                 <span className="text-celadon-ink/50 font-sans">Element State</span>
                 <span className="font-medium text-celadon-jade font-serif">{pillars.day.stem} Source</span>
               </div>
               <div className="flex justify-between text-xs border-b border-celadon-jade/5 pb-1">
                 <span className="text-celadon-ink/50 font-sans">Seasonal Birth</span>
                 <span className="font-medium underline decoration-celadon-jade/10">{pillars.month.branch} Energy</span>
               </div>
            </div>
            <div className="mt-4 pt-3 border-t border-celadon-jade/10">
              <p className="text-[9px] italic text-celadon-jade/60 leading-relaxed font-serif">
                This profile serves as your personal baseline for the Celadon Almanac's calculations.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 mt-12 space-y-4 border-2 border-dashed border-celadon-jade-light/10 rounded-xl max-h-[300px]">
           <BookOpen className="w-10 h-10 text-celadon-jade-light/40" />
           <p className="text-[11px] text-celadon-ink/40 font-serif">Enter your birth details above to reveal your Eight Characters and personal affinities.</p>
        </div>
      )}
      </div>
      )}

      <div className="pt-4 border-t border-celadon-jade-light/20 flex items-center justify-between mt-auto">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border border-celadon-vermilion rotate-45 flex items-center justify-center">
            <div className="w-1 h-1 bg-celadon-vermilion" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-celadon-ink font-sans">Guofeng Seal</span>
        </div>
        <span className="text-[10px] text-celadon-jade/40 font-mono">MVP v2.2</span>
      </div>
    </div>
  );
};
