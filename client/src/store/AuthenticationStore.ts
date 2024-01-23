import { create } from "zustand";

import { User } from "models";

type Store = {
  authenticatedUser: User | null;
  isLoading: boolean;
  isFinishedLoading: boolean;
  setAuthenticatedUser: (user: User | null) => void;
  setIsLoading: (value: boolean) => void;
  setIsFinishedLoading: (value: boolean) => void;
};

export const useAuthenticationStore = create<Store>((set) => ({
  authenticatedUser: null,
  isLoading: false,
  isFinishedLoading: false,
  setAuthenticatedUser(user) {
    set((state) => ({ ...state, authenticatedUser: user }));
  },
  setIsLoading(newValue) {
    const { isLoading: currentValue } = useAuthenticationStore.getState();

    if (newValue !== currentValue) {
      set((state) => ({ ...state, isLoading: newValue }));
    }
  },
  setIsFinishedLoading(newValue) {
    const { isFinishedLoading: currentValue } =
      useAuthenticationStore.getState();

    if (newValue !== currentValue) {
      set((state) => ({ ...state, isFinishedLoading: newValue }));
    }
  },
}));
