import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { NavButton } from "../NavButton/NavButton"
import Switch from "@mui/material/Switch"
import { Container } from "@mui/material"
import { selectThemeMode, toggleTheme } from "../../../app/appSlice"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { getTheme } from "../../theme/theme"
import { useAppSelector } from "../../hooks/useAppSelector"
import { containerSx } from "@/common/styles/container.styles"

export const Header = () => {
  // useDispatch
  const dispatch = useAppDispatch()
  // useSelector
  const switchTheme = useAppSelector(selectThemeMode)
  // Functione for Theme
  const theme = getTheme(switchTheme)
  // Functione for switch Theme
  const changeMode = () => {
    dispatch(toggleTheme({ switchTheme: switchTheme === "light" ? "dark" : "light" }))
  }
  return (
    <>
      <AppBar position="static" sx={{ mb: "30px" }}>
        <Toolbar>
          <Container maxWidth={"lg"} sx={containerSx}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <div>
              <NavButton>Sign in</NavButton>
              <NavButton>Sign up</NavButton>
              <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
              <Switch color={"default"} onChange={changeMode} />
            </div>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  )
}
