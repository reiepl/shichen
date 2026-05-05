import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserBazi {
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthHour: number;
}

interface AlmanacState {
  userBirthData: UserBazi | null;
  selectedDate: Date;
  isPersonalMode: boolean;
  activeStar: string | null;
  activePurpose: string | null;
  isProfileOpen: boolean;
  setUserBirthData: (data: UserBazi | null) => void;
  setSelectedDate: (date: Date) => void;
  setPersonalMode: (active: boolean) => void;
  setStarHighlight: (star: string | null) => void;
  setPurposeHighlight: (purpose: string | null) => void;
  setProfileOpen: (open: boolean) => void;
}

export const useStore = create<AlmanacState>()(
  persist(
    (set) => ({
      userBirthData: null,
      selectedDate: new Date(),
      isPersonalMode: false,
      activeStar: null,
      activePurpose: null,
      isProfileOpen: true,
      setUserBirthData: (data) => set({ 
        userBirthData: data,
        isPersonalMode: !!data 
      }),
      setSelectedDate: (date) => set({ selectedDate: date }),
      setPersonalMode: (active) => set({ isPersonalMode: active }),
      setStarHighlight: (star) => set({ activeStar: star }),
      setPurposeHighlight: (purpose) => set({ activePurpose: purpose }),
      setProfileOpen: (open) => set({ isProfileOpen: open }),
    }),
    {
      name: 'celadon-almanac-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (typeof state.selectedDate === 'string') {
            state.selectedDate = new Date(state.selectedDate);
          }
          // Ensure isPersonalMode syncs with user data existence
          if (state.userBirthData && !state.isPersonalMode) {
            state.isPersonalMode = true;
          }
        }
      },
    }
  )
);
