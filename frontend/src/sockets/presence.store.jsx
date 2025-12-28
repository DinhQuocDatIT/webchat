import { create } from "zustand";

export const usePresenceStore = create((set) => ({
  users: {}, // { username: "ONLINE" | "OFFLINE" }

  setStatus: (username, status) =>
    set((state) => ({
      users: {
        ...state.users,
        [username]: status,
      },
    })),
}));
