import { create } from "zustand";

import { User } from "models";

type Store = {
  authenticatedUser: User | null | undefined;
  isFinishedLoading: boolean;
  isLoading: boolean;
  setAuthenticatedUser: (user: User | null) => void;
  setIsFinishedLoading: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
};

export const useAuthenticationStore = create<Store>((set) => ({
  authenticatedUser: undefined,
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
