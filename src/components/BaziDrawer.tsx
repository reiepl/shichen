import { useEffect, useState } from 'react';
import { useStore } from '../store';
import { almanac, type Pillars } from '../lib/stemBranchAdapter';
import { CraneDivider } from './CraneDivider';
import { User, Calendar, Clock, Save } from 'lucide-react';

export const BaziDrawer = () => {
  const { userBirthData, setUserBirthData } = useStore();
  const [pillars, setPillars] = useState<Pillars | null>(null);
  
  // Local form state
  const [year, setYear] = useState(userBirthData?.birthYear || 1990);
  const [month, setMonth] = useState(userBirthData?.birthMonth || 1);
  const [day, setDay] = useState(userBirthData?.birthDay || 1);
  const [hour, setHour] = useState(userBirthData?.birthHour || 0);

  useEffect(() => {
    if (userBirthData) {
      const date = new Date(
        userBirthData.birthYear, 
        userBirthData.birthMonth - 1, 
        userBirthData.birthDay, 
        userBirthData.birthHour
      );
      setPillars(almanac.getPillars(date));
    }
  }, [userBirthData]);

  const handleSave = () => {
    setUserBirthData({
      birthYear: year,
      birthMonth: month,
      birthDay: day,
      birthHour: hour
    });
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-celadon-jade/10 flex items-center justify-center">
          <User className="w-4 h-4 text-celadon-jade" />
        </div>
        <h2 className="text-xl font-serif text-celadon-ink">Personal Bazi Profile</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] uppercase tracking-wider text-celadon-jade/60 font-sans block mb-1.5">Birth Date (Gregorian)</label>
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

        <div>
          <label className="text-[10px] uppercase tracking-wider text-celadon-jade/60 font-sans block mb-1.5">Birth Hour</label>
          <select 
            value={hour} 
            onChange={(e) => setHour(Number(e.target.value))}
            className="w-full bg-white border border-celadon-jade-light/40 px-2 py-1.5 rounded text-sm focus:outline-none focus:border-celadon-jade"
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>{i}:00 - {i}:59</option>
            ))}
          </select>
        </div>

        <button 
          onClick={handleSave}
          className="w-full bg-celadon-jade text-white py-2 rounded-md font-sans text-sm flex items-center justify-center space-x-2 hover:bg-celadon-jade/90 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Update Pillars</span>
        </button>
      </div>

      <CraneDivider />

      {pillars ? (
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Hour', p: pillars.hour },
              { label: 'Day', p: pillars.day },
              { label: 'Month', p: pillars.month },
              { label: 'Year', p: pillars.year }
            ].map(({ label, p }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-[9px] uppercase tracking-tighter text-celadon-jade/60 mb-2">{label}</span>
                <div className="flex flex-col space-y-1">
                  <div className="w-10 h-10 celadon-card flex items-center justify-center text-xl font-serif text-celadon-ink">
                    {p.stem}
                  </div>
                  <div className="w-10 h-10 celadon-card flex items-center justify-center text-xl font-serif text-celadon-ink">
                    {p.branch}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 rounded-lg bg-celadon-jade/5 border border-celadon-jade/10">
            <h3 className="text-sm font-serif text-celadon-jade mb-3 flex items-center space-x-2">
              <div className="w-1 h-1 bg-celadon-jade rotate-45" />
              <span>Metaphysical Signature</span>
            </h3>
            <div className="space-y-3">
               <div className="flex justify-between text-xs border-b border-celadon-jade/5 pb-1">
                 <span className="text-celadon-ink/60">Reference Pillar (DM)</span>
                 <span className="font-medium text-celadon-jade font-serif">{pillars.day.stem} {pillars.day.branch}</span>
               </div>
               <div className="flex justify-between text-xs border-b border-celadon-jade/5 pb-1">
                 <span className="text-celadon-ink/60">Life Source</span>
                 <span className="font-medium">{pillars.month.stem === '壬' || pillars.month.stem === '癸' ? 'Fluid' : 'Stable'}</span>
               </div>
               <div className="flex justify-between text-xs">
                 <span className="text-celadon-ink/60">Zodiac Affinity</span>
                 <span className="font-medium text-celadon-ink">{pillars.year.branch}</span>
               </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-celadon-jade/10">
              <p className="text-[10px] italic text-celadon-jade/60 leading-relaxed font-serif">
                Analysis calibrated to the Celadon Baseline. View the Almanac to see your personal harmony index.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4 border-2 border-dashed border-celadon-jade-light/20 rounded-xl">
           <Calendar className="w-12 h-12 text-celadon-jade-light" />
           <p className="text-sm text-celadon-jade/60">Enter your birth details to unlock personalized almanac insights.</p>
        </div>
      )}

      <div className="pt-4 border-t border-celadon-jade-light/20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border border-celadon-vermilion rotate-45 flex items-center justify-center">
            <div className="w-1 h-1 bg-celadon-vermilion" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-celadon-ink font-sans">Guofeng Seal</span>
        </div>
        <span className="text-[10px] text-celadon-jade/40 font-mono">MVP v2.1</span>
      </div>
    </div>
  );
};
