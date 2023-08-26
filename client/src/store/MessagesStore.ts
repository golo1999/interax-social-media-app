import { create } from "zustand";

interface ActiveMessageBox {
  userId: string;
  visibility: "HIDDEN" | "VISIBLE";
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

export const useMessagesStore = create<Store>((set) => ({
  activeMessageBoxes: [
    { userId: "0", visibility: "VISIBLE" },
    { userId: "2", visibility: "VISIBLE" },
    { userId: "3", visibility: "VISIBLE" },
  ],
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
}));
