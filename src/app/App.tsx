import "./App.css"
import { ThemeProvider } from "@mui/material/styles"
import { getTheme } from "@/common/theme/theme"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { CssBaseline } from "@mui/material"
import { Header } from "@/common/components"
import { Main } from "./Main"
import { selectThemeMode } from "./appSlice"

export const App = () => {
  const switchTheme = useAppSelector(selectThemeMode)
  const theme = getTheme(switchTheme)
  return (
    <ThemeProvider theme={theme}>
      <div className={"app"}>
        <CssBaseline />
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  )
}
