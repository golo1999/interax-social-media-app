import { create } from "zustand";
import { persist } from "zustand/middleware";

import { MessageBoxVisibility } from "types";

interface ActiveMessageBox {
  userId: string;
  visibility: MessageBoxVisibility;
}

type Store = {
  activeMessageBoxes: ActiveMessageBox[];
  isChatModalVisible: boolean;
  addMessageBox: (userId: string) => void;
  closeChatModal: () => void;
  closeMessageBox: (userId: string) => void;
  maximizeMessageBox: (userId: string) => void;
  minimizeMessageBox: (userId: string) => void;
  openChatModal: () => void;
};

export const useMessagesStore = create<Store>()(
  persist(
    (set) => ({
      activeMessageBoxes: [],
      isChatModalVisible: false,
      addMessageBox(userId) {
        set((state) => ({
          ...state,
          activeMessageBoxes: [
            ...state.activeMessageBoxes,
            { userId, visibility: "VISIBLE" },
          ],
        }));
      },
      closeChatModal() {
        const { isChatModalVisible } = useMessagesStore.getState();

        if (isChatModalVisible) {
          set((state) => ({ ...state, isChatModalVisible: false }));
        }
      },
      closeMessageBox(userId) {
        set((state) => ({
          ...state,
          activeMessageBoxes: state.activeMessageBoxes.filter(
            (messageBox) => messageBox.userId !== userId
          ),
        }));
      },
      maximizeMessageBox(userId) {
        set((state) => ({
          ...state,
          activeMessageBoxes: state.activeMessageBoxes.map((messageBox) => {
            if (
              messageBox.userId === userId &&
              messageBox.visibility === "HIDDEN"
            ) {
              return { ...messageBox, visibility: "VISIBLE" };
            }

            return messageBox;
          }),
        }));
      },
      minimizeMessageBox(userId) {
        set((state) => ({
          ...state,
          activeMessageBoxes: state.activeMessageBoxes.map((messageBox) => {
            if (
              messageBox.userId === userId &&
              messageBox.visibility === "VISIBLE"
            ) {
              return { ...messageBox, visibility: "HIDDEN" };
            }

            return messageBox;
          }),
        }));
      },
      openChatModal() {
        const { isChatModalVisible } = useMessagesStore.getState();

        if (!isChatModalVisible) {
          set((state) => ({ ...state, isChatModalVisible: true }));
        }
      },
    }),
    {
      name: "messages-storage",
      partialize: ({ activeMessageBoxes }) => ({ activeMessageBoxes }),
    }
  )
);
