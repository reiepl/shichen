export const CalendarBanner = () => (
  <div className="relative w-full h-32 overflow-hidden bg-celadon-jade-light/10 rounded-t-xl mb-6">
    <div className="absolute inset-0 flex items-end">
      {/* Mountain Layers */}
      <svg 
        viewBox="0 0 1000 100" 
        preserveAspectRatio="none" 
        className="w-full h-full"
      >
        <path 
          d="M0 100 C 150 20, 350 80, 500 40 S 850 10, 1000 100 Z" 
          fill="#4A826E" 
          opacity="0.1" 
        />
        <path 
          d="M0 100 C 100 60, 200 40, 300 70 S 500 30, 700 80 S 900 40, 1000 100 Z" 
          fill="#4A826E" 
          opacity="0.2" 
        />
        <path 
          d="M0 100 C 50 80, 150 70, 250 90 S 450 60, 650 90 S 850 70, 1000 100 Z" 
          fill="#4A826E" 
          opacity="0.3" 
        />
      </svg>
    </div>
    
    {/* Crane Flight Path */}
    <div className="absolute top-4 left-0 w-full overflow-hidden">
      <svg width="200" height="40" viewBox="0 0 200 40" className="text-celadon-jade/40 ml-48">
        <path d="M0 20 Q50 0 100 20 T200 20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
        <circle cx="0" cy="20" r="1.5" fill="currentColor">
          <animateMotion path="M0 20 Q50 0 100 20 T200 20" dur="10s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>

    {/* Golden Mist Wisps */}
    <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
       <svg viewBox="0 0 400 100" className="w-full h-full opacity-40">
          <ellipse cx="350" cy="30" rx="100" ry="10" fill="url(#goldGradient)" />
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#C9A84C" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
       </svg>
    </div>
    
    <div className="absolute inset-x-0 bottom-0 p-6 flex justify-between items-end">
      <div>
        <h2 className="text-3xl font-serif text-celadon-ink tracking-tight">Today's Fortune</h2>
        <p className="text-xs uppercase tracking-widest text-celadon-jade/60 font-sans mt-1">Neo-Almanac Calendar System</p>
      </div>
      <div className="w-12 h-12 border border-celadon-vermilion/30 flex items-center justify-center rounded-sm bg-white/40">
        <span className="text-celadon-vermilion font-serif text-xl select-none">壬</span>
      </div>
    </div>
  </div>
);
