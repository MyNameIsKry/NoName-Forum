import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material";
import { purple } from "@mui/material/colors";

export const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    padding: "12px 24px",
    fontWeight: "bold",
    backgroundColor: purple[600],
    gap: "10px",
    '&:hover': {
      backgroundColor: purple[700],
    },
}));