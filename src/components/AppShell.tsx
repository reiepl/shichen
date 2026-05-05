import { BaziDrawer } from './BaziDrawer';
import { AlmanacPanel } from './AlmanacPanel';
import { useStore } from '../store';
import { cn } from '../lib/utils';

export const AppShell = () => {
  const { isProfileOpen } = useStore();

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden font-sans">
      {/* Left Drawer: Bazi Profile (Collapsible) */}
      <aside 
        className={cn(
          "bg-white border-r border-celadon-jade/10 z-40 transition-all duration-300 ease-in-out relative flex flex-col",
          isProfileOpen ? "w-[320px] xl:w-[380px]" : "w-0 -translate-x-full"
        )}
      >
        <div className="w-[320px] xl:w-[380px] h-full overflow-y-auto custom-scrollbar">
          <BaziDrawer />
        </div>
      </aside>

      {/* Right Panel: Neo-Almanac View */}
      <main className="flex-1 bg-celadon-bg/10 relative overflow-hidden flex flex-col">
        <AlmanacPanel />
      </main>
    </div>
  );
};

