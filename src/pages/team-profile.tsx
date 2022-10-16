import { Box, Tab, Tabs } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StyledBox, StyledTitle } from "../components";
import { getTeamLogo } from "../misc/images";
import URLS from "../misc/urls";
import { Team } from "../types";
import TeamProfileInfo from "./team-profile-info";
import TeamProfileRoster from "./team-profile-roster";

const TeamProfile = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = React.useState<Team>();
  const [tabValue, setTabValue] = React.useState(0);
  const teamLogo = id ? getTeamLogo(id) : "";
  const tabMenu = ["Info", "Roster"];

  const handleTabValueChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTabValue(newValue);
  };

  // fetch team data
  React.useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(
          `${URLS.GET_TEAMS}/${id}?${URLS.GET_TEAMS_INCLUDE_ROSTER}`
        );
        const data = res.data.teams;
        if (data.length > 0) setTeam({ ...data[0] });
        // redirect to the 404 page if no teams found
        else navigate("/not-found", { replace: true });
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchTeam();
  }, [id, navigate]);

  // update document title based on team name
  React.useEffect(() => {
    if (team) document.title = `Team - ${team.name}`;
    else document.title = "Team Profile";
  }, [team]);

  // format team data into table data

  return (
    <StyledBox>
      <img
        style={{ width: "100%", height: "200px" }}
        src={teamLogo}
        alt={`team-${id}-logo`}
        loading="lazy"
      />

      {team && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <StyledTitle>{team.name}</StyledTitle>
          <Box sx={{ marginBottom: theme.spacing(2) }}>
            <Tabs value={tabValue} onChange={handleTabValueChange}>
              {tabMenu.map((item, index) => (
                <Tab key={item} label={item} value={index} />
              ))}
            </Tabs>
          </Box>
          <TeamProfileInfo tab={tabValue} index={0} data={team} />
          <TeamProfileRoster
            tab={tabValue}
            index={1}
            data={team.roster?.roster || []}
          />
        </Box>
      )}
    </StyledBox>
  );
};

export default TeamProfile;
