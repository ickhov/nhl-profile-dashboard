import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { StyledBox } from "../components";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return <StyledBox>Hello</StyledBox>;
};

export default Home;
