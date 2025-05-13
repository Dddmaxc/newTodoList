import { Button, styled } from "@mui/material";
import { theme } from "./theme";

type MenuButtonProps = {
  background?: string;
  color?: string
};

export const MenuButton = styled(Button)<MenuButtonProps>(({ background, color }) => ({
  minWidth: "80px",
  height: "30px",
  fontWeight: "bold",
  borderRadius: "5px",
  textTransform: "capitalize",
  margin: "0 10",
  padding: "8px 24px",
  color: color || theme.palette.extra?.extra8,
  backgroundColor: background || theme.palette.extra?.extra7,
  // hover эффект
  "&:hover": {
    backgroundColor: theme.palette.secondary.main, // Это цвет, который будет при наведении
    boxShadow: "0 0 0 2px #ffffff",
  }, // Пример дополнительного эффекта при hover
}));
