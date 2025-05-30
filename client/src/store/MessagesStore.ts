import { create } from "zustand";
import { persist } from "zustand/middleware";

import { MessageBoxVisibility } from "types";

interface ActiveMessageBox {
  authenticatedUserId: string;
  userId: string;
  visibility: MessageBoxVisibility;
}

type Store = {
  activeMessageBoxes: ActiveMessageBox[];
  isChatModalVisible: boolean;
  addMessageBox: (authenticatedUserId: string, userId: string) => void;
  closeChatModal: () => void;
  closeMessageBox: (authenticatedUserId: string, userId: string) => void;
  maximizeMessageBox: (authenticatedUserId: string, userId: string) => void;
  minimizeMessageBox: (authenticatedUserId: string, userId: string) => void;
  openChatModal: () => void;
};

export const useMessagesStore = create<Store>()(
  persist(
    (set) => ({
      activeMessageBoxes: [],
      isChatModalVisible: false,
      addMessageBox(authenticatedUserId, userId) {
        set((state) => ({
          ...state,
          activeMessageBoxes: [
            ...state.activeMessageBoxes,
            { authenticatedUserId, userId, visibility: "VISIBLE" },
          ],
        }));
      },
      closeChatModal() {
        const { isChatModalVisible } = useMessagesStore.getState();

        if (isChatModalVisible) {
          set((state) => ({ ...state, isChatModalVisible: false }));
        }
      },
      closeMessageBox(authenticatedUserId, userId) {
        set((state) => ({
          ...state,
          activeMessageBoxes: state.activeMessageBoxes.filter(
            (messageBox) =>
              messageBox.authenticatedUserId === authenticatedUserId &&
              messageBox.userId !== userId
          ),
        }));
      },
      maximizeMessageBox(authenticatedUserId, userId) {
        set((state) => ({
          ...state,
          activeMessageBoxes: state.activeMessageBoxes.map((messageBox) => {
            if (
              messageBox.authenticatedUserId === authenticatedUserId &&
              messageBox.userId === userId &&
              messageBox.visibility === "HIDDEN"
            ) {
              return { ...messageBox, visibility: "VISIBLE" };
            }

            return messageBox;
          }),
        }));
      },
      minimizeMessageBox(authenticatedUserId, userId) {
        set((state) => ({
          ...state,
          activeMessageBoxes: state.activeMessageBoxes.map((messageBox) => {
            if (
              messageBox.authenticatedUserId === authenticatedUserId &&
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
      name: "interax-messages-storage",
      partialize: ({ activeMessageBoxes }) => ({ activeMessageBoxes }),
    }
  )
);
