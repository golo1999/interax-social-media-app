import { create } from "zustand";

import { User } from "models";

type Store = {
  authenticatedUser: User | null;
  setAuthenticatedUser: (user: User | null) => void;
};

export const useAuthenticationStore = create<Store>((set) => ({
  authenticatedUser: null,
  setAuthenticatedUser(user) {
    set((state) => ({ ...state, authenticatedUser: user }));
  },
}));
