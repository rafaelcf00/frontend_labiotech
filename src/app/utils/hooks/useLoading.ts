import { create } from "zustand";

interface LoadingProps {
  isLoader: boolean;
  onActive: () => void;
  onInactive: () => void;
}

const useLoading = create<LoadingProps>((set) => ({
  isLoader: true,
  onActive: () => set({ isLoader: true }),
  onInactive: () => set({ isLoader: false }),
}));

export default useLoading;
