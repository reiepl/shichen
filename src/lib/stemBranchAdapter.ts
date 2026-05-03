import { 
  computeFourPillars, 
  getHeavenlyNoble, 
  getHeavenlyVirtue, 
  getMonthlyVirtue, 
  THREE_HARMONIES, 
  HARMONY_PAIRS, 
  CLASH_PAIRS 
} from '@4n6h4x0r/stem-branch';
import { Solar, Lunar } from 'lunar-typescript';

// Centralized access for Bazi and Almanac logic
export const almanac = {
  getPillars: (date: Date | string) => computeFourPillars(new Date(date)),
  getNoble: (stem: string) => getHeavenlyNoble(stem as any),
  getVirtue: (branch: string) => ({
    heavenly: getHeavenlyVirtue(branch as any),
    monthly: getMonthlyVirtue(branch as any)
  }),
  // Exporting constants for UI logic
  HARMONY_PAIRS,
  THREE_HARMONIES,
  CLASH_PAIRS,
  
  // Branch to English Name
  BRANCH_EN: {
    '子': 'Rat', '丑': 'Ox', '寅': 'Tiger', '卯': 'Rabbit',
    '辰': 'Dragon', '巳': 'Snake', '午': 'Horse', '未': 'Goat',
    '申': 'Monkey', '酉': 'Rooster', '戌': 'Dog', '亥': 'Pig'
  } as Record<string, string>,

  getTripleHarmony: (branch: string) => {
    const found = THREE_HARMONIES.find(group => (group as any).branches.includes(branch as any));
    return found ? (found as any).branches as string[] : [];
  },

  getSixHarmony: (branch: string) => {
    const pair = HARMONY_PAIRS.find(([a, b]) => a === branch || b === branch);
    return pair ? (pair[0] === branch ? pair[1] : pair[0]) : '';
  },
  
  // Lunar helpers
  getLunarInfo: (date: Date | string) => {
    const solar = Solar.fromDate(new Date(date));
    const lunar = solar.getLunar();
    
    // Get pillars for virtue/noble checks
    const p = computeFourPillars(new Date(date));
    const monthStem = p.month.stem;
    const monthBranch = p.month.branch;
    const dayStem = p.day.stem;
    const dayBranch = p.day.branch;
    
    const virtues = {
      heavenly: getHeavenlyVirtue(monthBranch as any),
      monthly: getMonthlyVirtue(monthBranch as any)
    };
    
    // Non-personal (Tong Shu) Heavenly Noble is derived from the MONTH stem
    const monthNobleBranches = getHeavenlyNoble(monthStem as any);
    
    // Check if daily stem/branch matches virtue or month noble
    const isHeavenlyVirtue = virtues.heavenly === dayStem || virtues.heavenly === dayBranch;
    const isMonthlyVirtue = virtues.monthly === dayStem;
    const isHeavenlyNoble = monthNobleBranches.includes(dayBranch as any);

    return {
      monthStr: lunar.getMonthInChinese() + '月',
      dayStr: lunar.getDayInChinese(),
      isFirstDay: lunar.getDay() === 1,
      festivals: [...lunar.getFestivals(), ...lunar.getOtherFestivals()],
      zodiac: lunar.getYearShengXiao(),
      ganZhi: lunar.getDayInGanZhi(),
      officer: lunar.getZhiXing(),
      yi: lunar.getDayYi(),
      ji: lunar.getDayJi(),
      isHeavenlyVirtue,
      isMonthlyVirtue,
      isHeavenlyNoble
    };
  }
};

export type Pillars = ReturnType<typeof computeFourPillars>;

export function calcPersonalScore(userPillars: Pillars, dayPillars: Pillars) {
  let score = 60; // Base neutral score
  
  try {
    const userDayStem = userPillars.day.stem;
    const targetDayStem = dayPillars.day.stem;
    
    if ((HARMONY_PAIRS as any)[userDayStem] === targetDayStem) {
      score += 20;
    }
    
    const userDayBranch = userPillars.day.branch;
    const targetDayBranch = dayPillars.day.branch;
    
    if ((CLASH_PAIRS as any)[userDayBranch] === targetDayBranch) {
      score -= 30;
    }
  } catch (e) {
    // Graceful fallback
  }
  
  return Math.max(0, Math.min(100, score));
}
