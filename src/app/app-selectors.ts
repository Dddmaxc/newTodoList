import { SwitchTheme } from "./appSlice";
import { RootState } from "./store";

export const selectThemeMode = (state: RootState): SwitchTheme => state.app.switchTheme