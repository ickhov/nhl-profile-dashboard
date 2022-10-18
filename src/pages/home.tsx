import { Box } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledBox, StyledButton, StyledTitle } from "../components";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const fullWelcomeMessage = "Welcome to the NHL Dashboard!";
  const [welcomeMessage, setWelcomeMessage] = React.useState("");
  const [animationIndex, setAnimationIndex] = React.useState(0);

  const handleViewTeamsClick = () => {
    navigate("/teams");
  };

  // grab the text up until the specified index
  React.useEffect(() => {
    setWelcomeMessage(fullWelcomeMessage.slice(0, animationIndex));
  }, [animationIndex, fullWelcomeMessage]);

  // add one letter to the text every 50 ms
  React.useEffect(() => {
    if (animationIndex < fullWelcomeMessage.length) {
      setTimeout(() => {
        setAnimationIndex((prev) => prev + 1);
      }, 50);
    }
  }, [animationIndex, fullWelcomeMessage]);

  return (
    <StyledBox>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StyledTitle
          role="home-welcome-message"
          sx={{
            width: "100%",
            fontSize: {
              xs: "2rem",
              sm: "3rem",
              md: "4rem",
            },
            textAlign: "center",
          }}
        >
          {welcomeMessage}
        </StyledTitle>
        <StyledButton
          role="home-view-teams-button"
          onClick={handleViewTeamsClick}
          sx={{
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            marginTop: theme.spacing(2),
            "&:hover": {
              background: alpha(theme.palette.primary.main, 0.9),
            },
          }}
        >
          View Teams
        </StyledButton>
      </Box>
    </StyledBox>
  );
};

export default Home;
