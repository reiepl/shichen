import React from 'react';
import { Book, ChevronRight, Star } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StarDefinition {
  name: string;
  chinese: string;
  level: 'Omega' | 'Alpha' | 'Beta' | 'Gamma';
  description: string;
  details?: string[];
}

const STAR_LEVELS = [
  { level: 'Omega', label: 'S-Level', color: 'text-celadon-vermilion', bg: 'bg-celadon-vermilion/10', desc: 'Huge impact, affects everyone in a year.' },
  { level: 'Alpha', label: 'A-Level', color: 'text-celadon-gold', bg: 'bg-celadon-gold/10', desc: '2-4 skills. High-ranking nobleman or protective grace.' },
  { level: 'Beta', label: 'B-Level', color: 'text-celadon-jade', bg: 'bg-celadon-jade/10', desc: '1 specialized skill.' },
  { level: 'Gamma', label: 'C-Level', color: 'text-gray-500', bg: 'bg-gray-100', desc: 'Weakest, one minor expertise.' }
];

const DEFINITIONS: StarDefinition[] = [
  {
    name: "Heavenly Yi Nobleman",
    chinese: "天乙贵人",
    level: "Alpha",
    description: "The highest-ranking nobleman star. Positioned just below omega-level titan stars. Embodies inspiration, guidance, and assisted by capable influencers.",
    details: [
      "Attracts high-ranking helpers, mentors, and sponsors who offer timely solutions.",
      "Ensures the right person or insight appears during critical moments or high-stakes crises.",
      "Ideal for networking, scheduling meetings, or activities where one seeks inspiration.",
      "Personalized usage is maximized by matching with individual destiny charts."
    ]
  },
  {
    name: "Heavenly Virtue",
    chinese: "天德",
    level: "Alpha",
    description: "A high-ranking protective grace star. Represents high-level mitigation of adverse conditions and dissolving obstacles.",
    details: [
      "Primarily a star of mitigation rather than action; reduces resistance and friction.",
      "Powerful enough to overcome 6-8 Gamma-level stars.",
      "Requires 3-5 Alpha-level stars to counter one Omega-level threat (e.g. Five Yellow).",
      "Softens financial blows, career derailments, and relationship conflicts."
    ]
  }
];

const CONCEPTS = [
  {
    name: "Helpful People (Noblemen)",
    chinese: "贵人 (Gui Ren)",
    description: "Key figures such as mentors, sponsors, or influential individuals who provide timely assistance, solutions, or inspiration. Utilizing the energy of these stars allows an individual to activate transformation and inspiration in their life.",
    purposes: [
      "Gaining Insights: Meeting during nobleman hours can provoke new insights or ideas.",
      "Crisis Intervention: Ensures the right person appears at critical moments when stakes are high.",
      "Dissolving Obstacles: High-ranking stars (e.g. Heavenly Virtue) dissolve adverse conditions.",
      "Smoothing Execution: Reduces resistance and friction to enable smooth progress.",
      "Attracting Support: Attracts capable mentors and influential guides into your life.",
      "Relationship Mitigation: Sends the right solution during moments of friction or tension.",
      "Financial Protection: Softens blows from downturns, providing 'room' to recover."
    ]
  },
  {
    name: "Harmony Partner",
    chinese: "六合 (Liu He)",
    description: "A personal star used to harmonize and attract connections. It acts as an important component for attracting noblemen and connecting people into your life.",
    details: [
      "Identification: Determined personally based on your date and time of birth.",
      "Application: Match your personal harmony sign with a calendar date containing beneficial stars.",
      "Activities: Ideal for taking action, scheduling dinners, trips, or meaningful conversations."
    ]
  }
];

export const ReferenceDictionary = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Search/Header */}
      <div className="flex items-center space-x-2 border-b border-celadon-jade/10 pb-2">
        <Book className="w-4 h-4 text-celadon-jade" />
        <h3 className="text-sm font-serif text-celadon-ink">Almanac Lexicon</h3>
      </div>

      {/* Concept Glossary */}
      <div className="space-y-6">
        <h4 className="text-[10px] uppercase tracking-widest text-celadon-jade/50 font-sans">Core Concepts</h4>
        <div className="space-y-6">
          {CONCEPTS.map((c) => (
            <div key={c.name} className="celadon-card p-4 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-celadon-ink">{c.name}</span>
                <span className="text-[10px] font-serif text-celadon-jade">{c.chinese}</span>
              </div>
              <p className="text-[10px] text-celadon-ink/60 font-serif leading-relaxed italic border-l-2 border-celadon-jade/10 pl-2">
                {c.description}
              </p>
              {(c.purposes || (c as any).details) && (
                <ul className="space-y-2">
                  {(c.purposes || (c as any).details).map((p: string, i: number) => (
                    <li key={i} className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-celadon-jade/30 rounded-full mt-1.5 shrink-0" />
                      <span className="text-[9px] text-celadon-ink/70 leading-snug">{p}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Star Classification */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h4 className="text-[10px] uppercase tracking-widest text-celadon-jade/50 font-sans">Star Tier System</h4>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {STAR_LEVELS.map((s) => (
            <div key={s.level} className="flex items-start space-x-3 p-2 rounded bg-celadon-bg/30">
              <div className={cn("px-1.5 py-0.5 rounded text-[8px] font-bold uppercase", s.bg, s.color)}>
                {s.level}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-medium text-celadon-ink">{s.label}</span>
                <span className="text-[9px] text-celadon-ink/50 leading-tight">{s.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Stars */}
      <div className="space-y-4">
        <h4 className="text-[10px] uppercase tracking-widest text-celadon-jade/50 font-sans">Prominent Stars</h4>
        <div className="space-y-4">
          {DEFINITIONS.map((s) => (
            <div key={s.name} className="group">
              <div className="flex items-center space-x-2 mb-1.5">
                <Star className="w-3 h-3 text-celadon-gold fill-current" />
                <span className="text-xs font-bold text-celadon-ink">{s.name}</span>
                <span className="text-[10px] font-serif text-celadon-jade/60">{s.chinese}</span>
              </div>
              <div className="pl-5 border-l border-celadon-jade/10 ml-1.5 space-y-2">
                <p className="text-[10px] text-celadon-ink/70 leading-relaxed font-serif">
                  {s.description}
                </p>
                {s.details && (
                  <ul className="space-y-1">
                    {s.details.map((d, i) => (
                      <li key={i} className="flex items-start space-x-2 group-hover:translate-x-1 transition-transform">
                        <ChevronRight className="w-2.5 h-2.5 text-celadon-jade/30 mt-0.5" />
                        <span className="text-[9px] text-celadon-ink/60 italic">{d}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footnote */}
      <div className="pt-6 border-t border-celadon-jade/10">
        <p className="text-[9px] text-celadon-jade/40 font-serif text-center italic">
          Calibrating destiny through the Celadon baseline logic.
        </p>
      </div>
    </div>
  );
};
