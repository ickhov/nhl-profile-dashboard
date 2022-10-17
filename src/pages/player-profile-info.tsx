import { Box, Grid, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { Player } from "../types";

interface PlayerProfileInfoProps {
  data: Player;
}

interface PlayerProfileInfoRowProps {
  label: string;
  content: string;
}

const PlayerProfileInfoRow = (props: PlayerProfileInfoRowProps) => {
  const theme = useTheme();
  const borderRadius = `${theme.shape.borderRadius}px`;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          width: "100%",
          textAlign: "center",
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
          borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
        }}
      >
        {props.label}
      </Typography>
      <Typography
        sx={{
          width: "100%",
          textAlign: "center",
          fontWeight: 700,
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          borderBottomLeftRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
        }}
      >
        {props.content}
      </Typography>
    </Box>
  );
};

const PlayerProfileInfo = (props: PlayerProfileInfoProps) => {
  const { data } = props;
  const items: PlayerProfileInfoRowProps[] = [
    {
      label: "Age",
      content: `${data.currentAge} years old`,
    },
    {
      label: "Height",
      content: data.height,
    },
    {
      label: "Weight",
      content: `${data.weight} lbs`,
    },
    {
      label: "Shooting & Catching Hand",
      content: data.shootsCatches === "L" ? "Left" : "Right",
    },
    {
      label: "Nationality",
      content: data.nationality,
    },
    {
      label: "Captain",
      content: data.captain
        ? "Captain"
        : data.alternateCaptain
        ? "Alternate Captain"
        : "No",
    },
    {
      label: "Rookie",
      content: data.rookie ? "Yes" : "No",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid key={item.label} item xs={12} sm={6}>
            <PlayerProfileInfoRow label={item.label} content={item.content} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PlayerProfileInfo;
