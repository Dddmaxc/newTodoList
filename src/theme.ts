import { createTheme } from '@mui/material/styles';


export const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: '#673ab7',
    },
    info:{
       main: '#d03337' 
    },


    white: { main: '#fff' }, // оранжевый
    black: { main: '#000' }, // индиго
    extra3: { main: '#009688' }, // зелёно-бирюзовый
    extra4: { main: '#8BC34A' }, // салатовый

    extra6: { main: '#795548' }, // коричневый
    extra7: { main: '#607D8B' }, // серо-синий
    extra8: { main: '#9C27B0' }, // фиолетовый
    extra9: { main: '#F44336' }, // красный
    extra10: { main: '#00BCD4' }, // голубой
  } as any
  },
);
