import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  isAuthModalOpen: boolean;
  isMobileSidebarOpen: boolean;
}

const initialState: UiState = {
  isAuthModalOpen: false,
  isMobileSidebarOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAuthModal(state) {
      state.isAuthModalOpen = true;
    },
    closeAuthModal(state) {
      state.isAuthModalOpen = false;
    },
    openMobileSidebar(state) {
      state.isMobileSidebarOpen = true;
    },
    closeMobileSidebar(state) {
      state.isMobileSidebarOpen = false;
    },
  },
});

export const { openAuthModal, closeAuthModal, openMobileSidebar, closeMobileSidebar } =
  uiSlice.actions;
export default uiSlice.reducer;
