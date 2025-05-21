import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "@/common/theme/theme";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { selectThemeMode } from "./app-selectors";
import { AppHttpRequests } from "./AppHttpRequests";

export const App = () => {
  const switchTheme = useAppSelector(selectThemeMode);
  const theme = getTheme(switchTheme);
  return (
    <ThemeProvider theme={theme}>
      <div className={"app"}>
        {/* <CssBaseline />
        <Header />
        <Main /> */}
         <AppHttpRequests />
      </div>
    </ThemeProvider>
  );
};
