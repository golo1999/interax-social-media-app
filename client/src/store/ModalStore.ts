import { create } from "zustand";

type Store = {
  confirmationModalConfirmButtonText: string | undefined;
  confirmationModalMessage: string | undefined;
  confirmationModalTitle: string | undefined;
  isConfirmationModalOpen: boolean;
  sharedPostId: string | undefined;
  closeConfirmationModal: () => void;
  openConfirmationModal: () => void;
  setConfirmationModalConfirmButtonText: (
    confirmationModalConfirmButtonText: string
  ) => void;
  setConfirmationModalMessage: (confirmationModalMessage: string) => void;
  setConfirmationModalTitle: (confirmationModalTitle: string) => void;
  setSharedPostId: (id: string | undefined) => void;
};

export const useModalStore = create<Store>((set) => ({
  confirmationModalConfirmButtonText: undefined,
  confirmationModalMessage: undefined,
  confirmationModalTitle: undefined,
  isConfirmationModalOpen: false,
  sharedPostId: undefined,
  closeConfirmationModal() {
    const { isConfirmationModalOpen } = useModalStore.getState();

    if (isConfirmationModalOpen) {
      set((state) => ({ ...state, isConfirmationModalOpen: false }));
    }
  },
  openConfirmationModal() {
    const { isConfirmationModalOpen } = useModalStore.getState();

    if (!isConfirmationModalOpen) {
      set((state) => ({ ...state, isConfirmationModalOpen: true }));
    }
  },
  setConfirmationModalConfirmButtonText(confirmationModalConfirmButtonText) {
    set((state) => ({ ...state, confirmationModalConfirmButtonText }));
  },
  setConfirmationModalMessage(confirmationModalMessage) {
    set((state) => ({ ...state, confirmationModalMessage }));
  },
  setConfirmationModalTitle(confirmationModalTitle) {
    set((state) => ({ ...state, confirmationModalTitle }));
  },
  setSharedPostId(newSharedPostId) {
    const { sharedPostId } = useModalStore.getState();

    if (newSharedPostId !== sharedPostId) {
      set((state) => ({ ...state, sharedPostId: newSharedPostId }));
    }
  },
}));
