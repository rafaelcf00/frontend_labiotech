import { create } from "zustand";

interface SampleRegisterModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSampleRegisterModal = create<SampleRegisterModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSampleRegisterModal;
