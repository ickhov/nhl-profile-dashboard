import { styled } from "@mui/material/styles";
import { Typography, TypographyProps } from "@mui/material";

const StyledTitle = styled((props: TypographyProps) => (
  <Typography gutterBottom variant="h5" {...props} />
))({ fontWeight: 700 });

export default StyledTitle;
