import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Theme } from "types";

type Store = {
  isNotificationListVisible: boolean;
  isPostOptionsListVisible: { postId: string } | false;
  isSettingsListVisible: boolean;
  scrollPosition: number;
  theme: Theme;
  changeTheme: (newTheme: Theme) => void;
  closeNotificationsList: () => void;
  closePostOptionsList: () => void;
  closeSettingsList: () => void;
  openNotificationsList: () => void;
  openPostOptionsList: (postId: string) => void;
  openSettingsList: () => void;
  setScrollPosition: (scrollPosition: number) => void;
};

export const useSettingsStore = create<Store>()(
  persist(
    (set) => ({
      isConfirmationModalOpen: false,
      isNotificationListVisible: false,
      isPostOptionsListVisible: false,
      isSettingsListVisible: false,
      scrollPosition: 0,
      theme: "LIGHT",
      changeTheme(newTheme) {
        const { theme } = useSettingsStore.getState();

        if (newTheme !== theme) {
          set((state) => ({ ...state, theme: newTheme }));
        }
      },
      closeNotificationsList() {
        const { isNotificationListVisible } = useSettingsStore.getState();

        if (isNotificationListVisible) {
          set((state) => ({ ...state, isNotificationListVisible: false }));
        }
      },
      closePostOptionsList() {
        const { isPostOptionsListVisible } = useSettingsStore.getState();

        if (isPostOptionsListVisible) {
          set((state) => ({
            ...state,
            isPostOptionsListVisible: false,
          }));
        }
      },
      closeSettingsList() {
        const { isSettingsListVisible } = useSettingsStore.getState();

        if (isSettingsListVisible) {
          set((state) => ({ ...state, isSettingsListVisible: false }));
        }
      },
      openNotificationsList() {
        const { isNotificationListVisible } = useSettingsStore.getState();

        if (!isNotificationListVisible) {
          set((state) => ({ ...state, isNotificationListVisible: true }));
        }
      },
      openPostOptionsList(postId) {
        const { isPostOptionsListVisible } = useSettingsStore.getState();

        if (!isPostOptionsListVisible) {
          set((state) => ({
            ...state,
            isPostOptionsListVisible: { postId },
          }));
        }
      },
      openSettingsList() {
        const { isSettingsListVisible } = useSettingsStore.getState();

        if (!isSettingsListVisible) {
          set((state) => ({ ...state, isSettingsListVisible: true }));
        }
      },
      setScrollPosition(scrollPosition) {
        set((state) => ({ ...state, scrollPosition }));
      },
    }),
    {
      name: "interax-settings-storage",
      partialize: ({ theme }) => ({ theme }),
    }
  )
);
