import { Box, Card, CardContent, CardMedia, Grid } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { StyledSubtitle } from "../components";
import { Roster } from "../types";

interface TeamProfileRosterProps {
  tab: number;
  index: number;
  data: Roster[];
}

interface TeamProfileRosterCardProps {
  playerId: number;
  name: string;
}

const TeamProfileRosterCard = (props: TeamProfileRosterCardProps) => {
  const { playerId, name } = props;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/players/${playerId}`);
  };

  return (
    <Card
      sx={{
        background: (theme) => alpha(theme.palette.primary.main, 0.1),
        cursor: "pointer",
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="200"
        image="https://assets.nhle.com/mugs/nhl/default-skater.png"
        alt="person image"
      />
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <StyledSubtitle gutterBottom={false}>{name}</StyledSubtitle>
      </CardContent>
    </Card>
  );
};

const TeamProfileRoster = (props: TeamProfileRosterProps) => {
  const { tab, index, data } = props;

  return (
    <Box
      sx={{
        display: tab === index ? "flex" : "none",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid key={item.person.id} item xs={12} sm={6} md={4}>
            <TeamProfileRosterCard
              playerId={item.person.id}
              name={item.person.fullName}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeamProfileRoster;
