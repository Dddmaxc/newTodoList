import { createTheme } from "@mui/material"
import { SwitchTheme } from "../../app/appSlice"

export const getTheme = (switchTheme: SwitchTheme) => {
  return createTheme({
    palette: {
      mode: switchTheme,
      primary: { main: "#00c5fc" },
    },
  })
}
