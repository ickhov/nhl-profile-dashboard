// import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Column, StyledBox, VirtualizedTable } from "../components";
import URLS from "../static/urls";
import { Team, TeamTable } from "../types";

const Teams = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [teams, setTeams] = React.useState<Team[]>([]);
  const [tableData, setTableData] = React.useState<TeamTable[]>([]);
  const columns: Column<TeamTable>[] = [
    {
      key: "name",
      label: "Name",
      width: 250,
    },
    {
      key: "venueName",
      label: "Venue",
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
    },
  ];

  const handleRowClick = (data: TeamTable) => {
    navigate(`/${data.id}`);
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
        venueName: team.venue?.name || "N/A",
        divisionName: team.division?.name || "N/A",
        Action: team.officialSiteUrl ? (
          <Button
            variant="text"
            sx={{
              padding: 0,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            onClick={() => window.open(team.officialSiteUrl, "_blank")}
          >
            Visit Official Website
          </Button>
        ) : (
          <Typography>N/A</Typography>
        ),
      })),
    ]);
  }, [teams]);

  return (
    <StyledBox
      sx={{
        [theme.breakpoints.up("md")]: {
          maxWidth: "1200px",
          padding: theme.spacing(2),
        },
      }}
    >
      <VirtualizedTable
        columns={columns}
        data={tableData}
        onRowClick={handleRowClick}
      />
    </StyledBox>
  );
};

export default Teams;
