import { styled } from "@mui/material/styles";
import { Button, ButtonProps } from "@mui/material";

const StyledButton = styled((props: ButtonProps) => (
  <Button {...props} variant="contained" />
))(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export default StyledButton;
