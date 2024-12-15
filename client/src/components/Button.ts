import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material";
import { purple } from "@mui/material/colors";

interface CustomButtonProps extends ButtonProps {
  backgroundcolor?: string;
  hoverbackgroundcolor?: string;
  gap?: string;
  padding?: string;
}

export const CustomButton = styled(Button)<CustomButtonProps>((
  { 
    theme, 
    gap = "10px", 
    padding = "12px 24px", 
    backgroundcolor = purple[600],
    hoverbackgroundcolor = purple[700]
  }) => ({
    color: theme.palette.getContrastText(purple[500]),
    padding: padding,
    fontWeight: "bold",
    backgroundColor: backgroundcolor,
    gap: gap,
    '&:hover': {
      backgroundColor: hoverbackgroundcolor,
    },
}));