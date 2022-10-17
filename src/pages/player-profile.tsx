import { Avatar, Box, Chip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StyledBox, StyledTitle } from "../components";
import { getTeamLogo } from "../misc/images";
import URLS from "../misc/urls";
import { Player } from "../types";
import PlayerProfileInfo from "./player-profile-info";

const PlayerProfile = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = React.useState<Player>();
  const playerLogo = "https://assets.nhle.com/mugs/nhl/default-skater.png";

  const handleTeamNameClick = () => {
    navigate(`/teams/${player?.currentTeam.id}`);
  };

  // fetch player data
  React.useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await axios.get(`${URLS.GET_PLAYERS}/${id}`);
        const data = res.data.people;
        if (data.length > 0) setPlayer({ ...data[0] });
        // redirect to the 404 page if no players found
        else navigate("/not-found", { replace: true });
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchPlayer();
  }, [id, navigate]);

  // update document title based on player name
  React.useEffect(() => {
    if (player) document.title = `Player - ${player.fullName}`;
    else document.title = "Player Profile";
  }, [player]);

  return (
    <StyledBox
      sx={{
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <Avatar
          src={playerLogo}
          alt={`player-${id}-profile-picture`}
          sx={{
            width: "200px",
            height: "200px",
            border: `1px solid ${theme.palette.text.secondary}`,
          }}
        />
        {player && (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: {
                xs: "center",
                md: "flex-start",
              },
              margin: theme.spacing(0, 2),
            }}
          >
            <StyledTitle>{player.fullName}</StyledTitle>
            <Typography component='span' fontSize="1rem" fontWeight={700} gutterBottom>
              <Chip
                color="primary"
                label={player.currentTeam.name}
                onClick={handleTeamNameClick}
              />{" "}
              | #{player.primaryNumber} | {player.primaryPosition.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                "& > *": {
                  "&:not(:last-child)": {
                    marginRight: "4px",
                  },
                },
              }}
            >
              {player.captain && <Chip color="success" label="Captain" />}
              {player.alternateCaptain && (
                <Chip color="success" label="Alternate Captain" />
              )}
              {!player.captain && !player.alternateCaptain && (
                <Chip color="warning" label="Not a Captain" />
              )}
              {!player.rookie && <Chip color="success" label="Professional" />}
              {player.rookie && <Chip color="warning" label="Rookie" />}
            </Box>
          </Box>
        )}
      </Box>
      {/* Team Logo */}
      <Box
        sx={{
          position: "absolute",
          opacity: 0.2,
          width: "100%",
          height: "calc(100% - 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 0,
        }}
      >
        <img
          style={{ width: "100%", height: "100%", maxWidth: "600px" }}
          src={player ? getTeamLogo(player.currentTeam.id.toString()) : ""}
          alt={`team-${id}-logo`}
          loading="lazy"
        />
      </Box>
      {player && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: theme.spacing(2, 0),
            zIndex: 1,
          }}
        >
          <PlayerProfileInfo data={player} />
        </Box>
      )}
    </StyledBox>
  );
};

export default PlayerProfile;
