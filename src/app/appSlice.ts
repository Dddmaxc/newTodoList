import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type SwitchTheme = "dark" | "light"

const initialState = {
  switchTheme: "light" as SwitchTheme,
}

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    toggleTheme(state, action: PayloadAction<{ switchTheme: SwitchTheme }>) {
      state.switchTheme = action.payload.switchTheme
    },
  },
})

export const { toggleTheme } = appSlice.actions
export default appSlice.reducer
