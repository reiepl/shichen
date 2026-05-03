import { BaziDrawer } from './BaziDrawer';
import { AlmanacPanel } from './AlmanacPanel';

export const AppShell = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-celadon-bg overflow-hidden font-sans">
      {/* Left Drawer: Bazi Profile (Static on desktop, scrollable inside) */}
      <aside className="w-full lg:w-[320px] xl:w-[380px] bg-white border-b lg:border-r border-celadon-jade/10 z-10">
        <BaziDrawer />
      </aside>

      {/* Right Panel: Neo-Almanac View */}
      <main className="flex-1 bg-celadon-bg relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
          <svg width="100%" height="100%" className="text-celadon-jade">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="relative h-full">
          <AlmanacPanel />
        </div>
      </main>
    </div>
  );
};
