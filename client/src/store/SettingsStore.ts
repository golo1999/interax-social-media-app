import { create } from "zustand";

type Store = {
  isPostOptionsListVisible: { postId: string } | false;
  isSettingsListVisible: boolean;
  closePostOptionsList: () => void;
  closeSettingsList: () => void;
  openPostOptionsList: (postId: string) => void;
  openSettingsList: () => void;
};

export const useSettingsStore = create<Store>((set) => ({
  isPostOptionsListVisible: false,
  isSettingsListVisible: false,
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
