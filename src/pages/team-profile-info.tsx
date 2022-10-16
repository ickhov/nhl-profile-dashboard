import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { StyledSubtitle } from "../components";
import { Team } from "../types";
import { alpha } from "@mui/material/styles";

interface TeamProfileInfoProps {
  tab: number;
  index: number;
  data: Team;
}

interface TeamProfileInfoCardProps {
  label: string;
  content: string;
}

const TeamProfileInfoCard = (props: TeamProfileInfoCardProps) => (
  <Card sx={{ background: (theme) => alpha(theme.palette.primary.main, 0.1) }}>
    <CardContent>
      <StyledSubtitle>{props.label}</StyledSubtitle>
      <Typography>{props.content}</Typography>
    </CardContent>
  </Card>
);

const TeamProfileInfo = (props: TeamProfileInfoProps) => {
  const { tab, index, data } = props;
  const items: TeamProfileInfoCardProps[] = [
    {
      label: "Conference",
      content: data.conference.name,
    },
    {
      label: "Division",
      content: data.division.name,
    },
    {
      label: "Venue",
      content: data.venue.name,
    },
  ];

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
        {items.map((item) => (
          <Grid key={item.label} item xs={12} sm={6} md={4}>
            <TeamProfileInfoCard label={item.label} content={item.content} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeamProfileInfo;
