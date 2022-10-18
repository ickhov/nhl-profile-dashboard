import { Box, Card, CardContent, CardMedia, Grid } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AutocompleteOptionsKeyValueInput,
  StyledAutocomplete,
  StyledSubtitle,
} from "../components";
import { getPlayerLogo } from "../misc/images";
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
  const playerLogo = getPlayerLogo(playerId.toString());

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
        role={`player-profile-roster-player-${playerId}-image`}
        component="img"
        height="200"
        image={playerLogo}
        alt="person image"
      />
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <StyledSubtitle
          role={`player-profile-roster-player-${playerId}-full-name`}
          gutterBottom={false}
        >
          {name}
        </StyledSubtitle>
      </CardContent>
    </Card>
  );
};

const TeamProfileRoster = (props: TeamProfileRosterProps) => {
  const { tab, index, data } = props;
  const [searchValue, setSearchValue] = React.useState("");
  const [searchData, setSearchData] = React.useState<
    AutocompleteOptionsKeyValueInput[]
  >([]);
  const [cardData, setCardData] = React.useState<Roster[]>([]);

  const handleSearchValueChange = (data: string) => {
    setSearchValue(data);
  };

  const handleSearchInputChange = (data: string) => {
    if (data === "") setSearchValue(data);
  };

  // format roster data into search data
  React.useEffect(() => {
    setSearchData([
      ...data.map((person) => ({
        id: person.person.id.toString(),
        label: person.person.fullName,
      })),
    ]);
  }, [data]);

  // update table based on search value
  React.useEffect(() => {
    if (searchValue !== "")
      setCardData([
        ...data.filter((item) => item.person.id.toString() === searchValue),
      ]);
    else setCardData([...data]);
  }, [data, searchValue]);

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
      <StyledAutocomplete
        role="player-profile-roster-player-search"
        label="Search for players"
        options={searchData}
        value={searchValue}
        onChange={handleSearchValueChange}
        onInputChange={handleSearchInputChange}
        sx={{ marginBottom: (theme) => theme.spacing(2) }}
      />
      <Grid container spacing={2}>
        {cardData.map((item) => (
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
