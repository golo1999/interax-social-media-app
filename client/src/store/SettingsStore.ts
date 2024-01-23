import { create } from "zustand";

import { Theme } from "models";

type Store = {
  isNotificationListVisible: boolean;
  isPostOptionsListVisible: { postId: string } | false;
  isSettingsListVisible: boolean;
  theme: Theme;
  changeTheme: (newTheme: Theme) => void;
  closeNotificationsList: () => void;
  closePostOptionsList: () => void;
  closeSettingsList: () => void;
  openNotificationsList: () => void;
  openPostOptionsList: (postId: string) => void;
  openSettingsList: () => void;
};

export const useSettingsStore = create<Store>((set) => ({
  isNotificationListVisible: false,
  isPostOptionsListVisible: false,
  isSettingsListVisible: false,
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
}));
