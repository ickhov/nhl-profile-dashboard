import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  background: theme.palette.background.paper,
  [theme.breakpoints.up("md")]: {
    maxWidth: "800px",
    padding: theme.spacing(2, 0),
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
    padding: theme.spacing(2, 3),
  },
}));

export default StyledBox;
