import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledBox, StyledButton, StyledTitle } from "../components";
import Dog404 from "../misc/dog-404.svg";

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleRedirectToHomeClick = () => {
    navigate("/", { replace: true });
  };

  React.useEffect(() => {
    document.title = "404 Not Found";
  }, []);

  return (
    <StyledBox sx={{ justifyContent: "center", alignItems: "center" }}>
      <Box
        sx={{
          boxSizing: "border-box",
          width: "100%",
          maxWidth: "640px",
          padding: theme.spacing(3),
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: "1 0",
        }}
      >
        {/* eslint-disable-next-line */}
        <img role="404-not-found-logo" src={Dog404} alt="404 Not Found logo" />
        <StyledTitle
          role="404-not-found-message"
          sx={{ margin: theme.spacing(2.5, 0) }}
        >
          Oops! We could not find the page that you&apos;re looking for.
        </StyledTitle>
        <StyledButton
          role="404-not-found-back-to-home-button"
          onClick={handleRedirectToHomeClick}
          sx={{
            background: theme.palette.text.primary,
            color: theme.palette.background.paper,
            marginTop: theme.spacing(2),
            "&:hover": {
              background: theme.palette.text.secondary,
            },
          }}
        >
          Back to Home
        </StyledButton>
      </Box>
    </StyledBox>
  );
};

export default NotFound;
