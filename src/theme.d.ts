// theme.d.ts
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    [key: string]: any; // Индексная сигнатура для произвольных цветов
  }

  interface PaletteOptions {
    [key: string]: any; // Индексная сигнатура для произвольных цветов
  }
}
