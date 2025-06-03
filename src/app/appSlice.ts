import { createSlice } from "@reduxjs/toolkit"

export type SwitchTheme = "dark" | "light"

const initialState = {
  switchTheme: "light" as SwitchTheme,
}

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: (create) => ({
    toggleTheme: create.reducer<{ switchTheme: SwitchTheme }>((state, action) => {
      state.switchTheme = action.payload.switchTheme
    }),
  }),
  selectors: {
    selectThemeMode:(state) => state.switchTheme,
  },
})

export const { toggleTheme } = appSlice.actions
export const { selectThemeMode } = appSlice.selectors
export default appSlice.reducer
