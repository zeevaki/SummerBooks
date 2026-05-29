"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { closeAuthModal } from "@/store/slices/uiSlice";
import AuthModal from "@/components/ui/AuthModal";

export default function GlobalModals() {
  const dispatch = useAppDispatch();
  const isAuthModalOpen = useAppSelector((s) => s.ui.isAuthModalOpen);

  if (!isAuthModalOpen) return null;

  return <AuthModal onClose={() => dispatch(closeAuthModal())} />;
}
