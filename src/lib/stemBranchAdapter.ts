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

const NAYIN: Record<string, string> = {
  '甲子': '海中金', '乙丑': '海中金', '丙寅': '炉中火', '丁卯': '炉中火', '戊辰': '大林木', '己巳': '大林木',
  '庚午': '路旁土', '辛未': '路旁土', '壬申': '剑锋金', '癸酉': '剑锋金', '甲戌': '山头火', '乙亥': '山头火',
  '丙子': '涧下水', '丁丑': '涧下水', '戊寅': '城头土', '己卯': '城头土', '庚辰': '白蜡金', '辛巳': '白蜡金',
  '壬午': '杨柳木', '癸未': '杨柳木', '甲申': '泉中水', '乙酉': '泉中水', '丙戌': '屋上土', '丁亥': '屋上土',
  '戊子': '霹雳火', '己丑': '霹雳火', '庚寅': '松柏木', '辛卯': '松柏木', '壬辰': '长流水', '癸巳': '长流水',
  '甲午': '沙中金', '乙未': '沙中金', '丙申': '山下火', '丁酉': '山下火', '戊戌': '平地木', '己亥': '平地木',
  '庚子': '壁上土', '辛丑': '壁上土', '壬寅': '金箔金', '癸卯': '金箔金', '甲辰': '佛灯火', '乙巳': '佛灯火',
  '丙午': '天河水', '丁未': '天河水', '戊申': '大驿土', '己酉': '大驿土', '庚戌': '钗钏金', '辛亥': '钗钏金',
  '壬子': '桑柘木', '癸丑': '桑柘木', '甲寅': '大溪水', '乙卯': '大溪水', '丙辰': '沙中土', '丁巳': '沙中土',
  '戊午': '天上火', '己未': '天上火', '庚申': '石榴木', '辛酉': '石榴木', '壬戌': '大海水', '癸亥': '大海水'
};

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
  NAYIN,
  
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
  
  // Hour helpers
  getHourlyInfo: (date: Date, dayStem: string, dayBranch: string, monthBranch: string) => {
    const hourStemsStart: Record<string, string> = {
      '甲': '甲', '己': '甲',
      '乙': '丙', '庚': '丙',
      '丙': '戊', '辛': '戊',
      '丁': '庚', '壬': '庚',
      '戊': '壬', '癸': '壬'
    };
    
    return Array.from({ length: 12 }, (_, i) => {
      const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
      const hourBranch = branches[i];
      const startStem = hourStemsStart[dayStem];
      const stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
      const hourStem = stems[(stems.indexOf(startStem) + i) % 10];
      const hourGanZhi = hourStem + hourBranch;

      const hourRange = [
        (i * 2 - 1 + 24) % 24,
        (i * 2 + 1) % 24
      ];
      const rangeStr = `${hourRange[0]}:00-${hourRange[1]}:00`;
      
      const virtues = {
        heavenly: getHeavenlyVirtue(monthBranch as any),
        monthly: getMonthlyVirtue(monthBranch as any)
      };
      const dayNobleBranches = getHeavenlyNoble(dayStem as any);
      
      const isHeavenlyVirtue = virtues.heavenly === hourStem || virtues.heavenly === hourBranch;
      const isHeavenlyNoble = dayNobleBranches.includes(hourBranch as any);

      const isAuspicious = isHeavenlyVirtue || isHeavenlyNoble || ['寅', '卯', '巳', '申'].includes(hourBranch);

      // Suitable/Unsuitable logic (Expanded with more thematic terms)
      const yi = ['Private Planning', 'Self-Refinement'];
      const ji = ['Public Confrontation', 'Major Risk'];
      
      if (isHeavenlyNoble) {
        yi.unshift('Meetings with Benefactors', 'Seeking Guidance');
      }
      if (isHeavenlyVirtue) {
        yi.unshift('Health & Wellness', 'Resolving Conflict');
      }
      if (isAuspicious) {
        yi.push('Wealth Pursuit', 'Social Networking');
      } else {
        ji.unshift('Important Decisions');
      }

      return {
        index: i,
        branch: hourBranch,
        ganZhi: hourGanZhi,
        nayin: NAYIN[hourGanZhi] || '',
        range: rangeStr,
        isHeavenlyVirtue,
        isHeavenlyNoble,
        isAuspicious,
        name: hourBranch + '时',
        yi: Array.from(new Set(yi)).slice(0, 4),
        ji: Array.from(new Set(ji)).slice(0, 4)
      };
    });
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
