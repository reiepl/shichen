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
  setUserBirthData: (data: UserBazi | null) => void;
  setSelectedDate: (date: Date) => void;
  setPersonalMode: (active: boolean) => void;
}

export const useStore = create<AlmanacState>()(
  persist(
    (set) => ({
      userBirthData: null,
      selectedDate: new Date(),
      isPersonalMode: false,
      setUserBirthData: (data) => set({ 
        userBirthData: data,
        isPersonalMode: !!data 
      }),
      setSelectedDate: (date) => set({ selectedDate: date }),
      setPersonalMode: (active) => set({ isPersonalMode: active }),
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
