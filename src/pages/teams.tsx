import { Avatar, Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Column, StyledBox, VirtualizedTable } from "../components";
import { getTeamLogo } from "../misc/images";
import URLS from "../misc/urls";
import { Team, TeamTable } from "../types";

const Teams = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = React.useState<Team[]>([]);
  const [tableData, setTableData] = React.useState<TeamTable[]>([]);
  const columns: Column<TeamTable>[] = [
    {
      key: "id",
      label: "",
      width:60,
      formatData: (data) => (
        <Box>
          <Avatar
            alt={`team-${data}-logo`}
            src={getTeamLogo(data)}
            sx={{
              width: 30,
              height: 30,
              border: (theme) => `1px solid ${theme.palette.text.secondary}`,
            }}
          />
        </Box>
      ),
    },
    {
      key: "name",
      label: "Team",
      width: 250,
    },
    {
      key: "conferenceName",
      label: "Conference",
      width: 250,
    },
    {
      key: "divisionName",
      label: "Division",
      width: 200,
    },
    {
      key: "Action",
      label: "Action",
      width: 250,
      formatData: (data) => (
        data ? (
          <Button
            variant="text"
            sx={{
              padding: 0,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            onClick={() => window.open(data, "_blank")}
          >
            Visit Official Website
          </Button>
        ) : (
          <Typography>N/A</Typography>
        )
      )
    },
  ];

  const handleRowClick = (data: TeamTable) => {
    navigate(`/teams/${data.id}`);
  };

  // fetch team data
  React.useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get(URLS.GET_TEAMS);
        const data = res.data.teams;
        setTeams([...data]);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchTeams();
  }, []);

  // format team data into table data
  React.useEffect(() => {
    setTableData([
      ...teams.map((team) => ({
        id: team.id,
        name: team.name,
        conferenceName: team.conference?.name || "N/A",
        divisionName: team.division?.name || "N/A",
        Action: team.officialSiteUrl,
      })),
    ]);
  }, [teams]);

  // update document title
  React.useEffect(() => {
    document.title = "Teams";
  }, []);

  return (
    <StyledBox>
      <VirtualizedTable
        columns={columns}
        data={tableData}
        onRowClick={handleRowClick}
      />
    </StyledBox>
  );
};

export default Teams;
