// theme.js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif", // Глобальный шрифт
  },
  palette: {
    primary: {
      main: "#ffff00", // основной белый цвет
    },
    secondary: {
      main: "#f50057", // розовый
    },
    success: {
      main: "#00BCD4", // голубой
    },
    info: {
      main: "#d03337", // красный
    },
    // Теперь ты можешь использовать 'extra'
// @ts-ignore
    extra: {
      extra3: "#009688", // зелёно-бирюзовый
      extra4: "#8BC34A", // салатовый
      extra6: "#795548", // коричневый
      extra7: "#607D8B", // серо-синий
      extra8: "#9C27B0", // фиолетовый
      extra9: "#F44336", // красный
      extra10: "#00BCD4", // голубой
    },
  },
});
