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
  setUserBirthData: (data: UserBazi | null) => void;
  setSelectedDate: (date: Date) => void;
}

export const useStore = create<AlmanacState>()(
  persist(
    (set) => ({
      userBirthData: null,
      selectedDate: new Date(),
      setUserBirthData: (data) => set({ userBirthData: data }),
      setSelectedDate: (date) => set({ selectedDate: date }),
    }),
    {
      name: 'celadon-almanac-storage',
      onRehydrateStorage: () => (state) => {
        if (state && typeof state.selectedDate === 'string') {
          state.selectedDate = new Date(state.selectedDate);
        }
      },
    }
  )
);
