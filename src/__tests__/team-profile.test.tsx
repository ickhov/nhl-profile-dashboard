import {
  cleanup,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { act } from "react-test-renderer";
import { TeamProfile } from "../pages";

const teams = {
  teams: [
    {
      id: 1,
      name: "New Jersey Devils",
      link: "/api/v1/teams/1",
      venue: {
        name: "Prudential Center",
        link: "/api/v1/venues/null",
        city: "Newark",
        timeZone: {
          id: "America/New_York",
          offset: -4,
          tz: "EDT",
        },
      },
      abbreviation: "NJD",
      teamName: "Devils",
      locationName: "New Jersey",
      firstYearOfPlay: "1982",
      division: {
        id: 18,
        name: "Metropolitan",
        nameShort: "Metro",
        link: "/api/v1/divisions/18",
        abbreviation: "M",
      },
      conference: {
        id: 6,
        name: "Eastern",
        link: "/api/v1/conferences/6",
      },
      franchise: {
        franchiseId: 23,
        teamName: "Devils",
        link: "/api/v1/franchises/23",
      },
      roster: {
        roster: [
          {
            person: {
              id: 8473541,
              fullName: "Jonathan Bernier",
              link: "/api/v1/people/8473541",
            },
            jerseyNumber: "45",
            position: {
              code: "G",
              name: "Goalie",
              type: "Goalie",
              abbreviation: "G",
            },
          },
        ],
      },
    },
  ],
};

jest.mock("axios");

describe("<TeamProfile />", () => {
  afterEach(cleanup);
  (axios.get as jest.Mock).mockResolvedValue({ data: { ...teams } });
  it("should display the team's logo", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<TeamProfile />} />
        </Routes>
      </BrowserRouter>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      expect(screen.getByRole("team-profile-logo")).toBeTruthy();
    });
  });
  it("should display the team's name", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<TeamProfile />} />
        </Routes>
      </BrowserRouter>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));
    await waitFor(() => {
      expect(screen.getByRole("team-profile-name")).toHaveTextContent(
        "New Jersey Devils"
      );
    });
  });
  it("should have a tab navigation with options: Info and Roster", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<TeamProfile />} />
        </Routes>
      </BrowserRouter>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(3));
    await waitFor(() => {
      expect(screen.getByRole("team-profile-tab-info")).toHaveTextContent(
        "Info"
      );
      expect(screen.getByRole("team-profile-tab-roster")).toHaveTextContent(
        "Roster"
      );
    });
  });
});
