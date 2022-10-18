import { Button, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AutocompleteOptionsKeyValueInput,
  Column,
  StyledAutocomplete,
  StyledBox,
  VirtualizedTable
} from "../components";
import { getTeamLogo } from "../misc/images";
import URLS from "../misc/urls";
import { Team, TeamTable } from "../types";

const Teams = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = React.useState<Team[]>([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchData, setSearchData] = React.useState<
    AutocompleteOptionsKeyValueInput[]
  >([]);
  const [tableData, setTableData] = React.useState<TeamTable[]>([]);
  const columns: Column<TeamTable>[] = [
    {
      key: "id",
      label: "",
      width: 60,
      formatData: (data) => (
        <img
          alt={`team-${data}-logo`}
          src={getTeamLogo(data)}
          style={{
            width: 30,
            height: 30,
          }}
        />
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
      formatData: (data) =>
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
        ),
    },
  ];

  const handleRowClick = (data: TeamTable) => {
    navigate(`/teams/${data.id}`);
  };

  const handleSearchValueChange = (data: string) => {
    setSearchValue(data);
  };

  const handleSearchInputChange = (data: string) => {
    if (data === "") setSearchValue(data);
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

  // format team data into search data
  React.useEffect(() => {
    setSearchData([
      ...teams.map((team) => ({
        id: team.id.toString(),
        label: team.name,
      })),
    ]);
  }, [teams]);

  // update table based on search value
  React.useEffect(() => {
    if (searchValue !== "")
      setTableData([
        ...teams
          .filter((item) => item.id.toString() === searchValue)
          .map((team) => ({
            id: team.id,
            name: team.name,
            conferenceName: team.conference?.name || "N/A",
            divisionName: team.division?.name || "N/A",
            Action: team.officialSiteUrl,
          })),
      ]);
    else
      setTableData([
        ...teams.map((team) => ({
          id: team.id,
          name: team.name,
          conferenceName: team.conference?.name || "N/A",
          divisionName: team.division?.name || "N/A",
          Action: team.officialSiteUrl,
        })),
      ]);
  }, [teams, searchValue]);

  // update document title
  React.useEffect(() => {
    document.title = "Teams";
  }, []);

  return (
    <StyledBox>
      <StyledAutocomplete
        label="Search for teams"
        options={searchData}
        value={searchValue}
        onChange={handleSearchValueChange}
        onInputChange={handleSearchInputChange}
        sx={{ marginBottom: (theme) => theme.spacing(2) }}
      />
      <VirtualizedTable
        columns={columns}
        data={tableData}
        onRowClick={handleRowClick}
        sx={{
          height: 'calc(100% - 130px)'
        }}
      />
    </StyledBox>
  );
};

export default Teams;
