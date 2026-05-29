import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  uid: string | null;
  email: string | null;
  isLoggedIn: boolean;
  isGuest: boolean;
  authLoading: boolean;
}

const initialState: UserState = {
  uid: null,
  email: null,
  isLoggedIn: false,
  isGuest: false,
  authLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{ uid: string; email: string | null; isGuest: boolean }>
    ) {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      state.isGuest = action.payload.isGuest;
      state.authLoading = false;
    },
    clearUser(state) {
      state.uid = null;
      state.email = null;
      state.isLoggedIn = false;
      state.isGuest = false;
      state.authLoading = false;
    },
    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.authLoading = action.payload;
    },
  },
});

export const { setUser, clearUser, setAuthLoading } = userSlice.actions;
export default userSlice.reducer;
