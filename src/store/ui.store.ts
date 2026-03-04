import { create } from "zustand";

type Theme = "light" | "dark";

type ModalKey = "example";

interface UIState {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  // Sidebar
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;

  // Modals
  modals: Record<ModalKey, boolean>;
  openModal: (key: ModalKey) => void;
  closeModal: (key: ModalKey) => void;
  toggleModal: (key: ModalKey) => void;
}

const DEFAULT_MODALS: Record<ModalKey, boolean> = {
  example: false,
};

export const useUIStore = create<UIState>((set) => ({
  // Theme
  theme: "light",
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),

  // Sidebar
  isSidebarOpen: false,
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  // Modals
  modals: DEFAULT_MODALS,
  openModal: (key) =>
    set((state) => ({ modals: { ...state.modals, [key]: true } })),
  closeModal: (key) =>
    set((state) => ({ modals: { ...state.modals, [key]: false } })),
  toggleModal: (key) =>
    set((state) => ({
      modals: { ...state.modals, [key]: !state.modals[key] },
    })),
}));