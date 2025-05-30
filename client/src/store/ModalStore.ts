import { create } from "zustand";

type Store = {
  confirmationModalConfirmButtonText: string | undefined;
  confirmationModalMessage: string | undefined;
  confirmationModalTitle: string | undefined;
  isConfirmationModalOpen: boolean;
  isVisibilityModalOpen: boolean;
  sharedPostId: string | undefined;
  closeConfirmationModal: () => void;
  closeVisibilityModal: () => void;
  openConfirmationModal: () => void;
  openVisibilityModal: () => void;
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
  isVisibilityModalOpen: false,
  sharedPostId: undefined,
  closeConfirmationModal() {
    const { isConfirmationModalOpen } = useModalStore.getState();

    if (isConfirmationModalOpen) {
      set((state) => ({ ...state, isConfirmationModalOpen: false }));
    }
  },
  closeVisibilityModal() {
    const { isVisibilityModalOpen } = useModalStore.getState();

    if (isVisibilityModalOpen) {
      set((state) => ({ ...state, isVisibilityModalOpen: false }));
    }
  },
  openConfirmationModal() {
    const { isConfirmationModalOpen } = useModalStore.getState();

    if (!isConfirmationModalOpen) {
      set((state) => ({ ...state, isConfirmationModalOpen: true }));
    }
  },
  openVisibilityModal() {
    const { isVisibilityModalOpen } = useModalStore.getState();

    if (!isVisibilityModalOpen) {
      set((state) => ({ ...state, isVisibilityModalOpen: true }));
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
