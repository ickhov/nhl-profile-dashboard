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
import { PlayerProfile } from "../pages";

const player = {
  people: [
    {
      id: 8473541,
      fullName: "Jonathan Bernier",
      link: "/api/v1/people/8473541",
      firstName: "Jonathan",
      lastName: "Bernier",
      primaryNumber: "45",
      birthDate: "1988-08-07",
      currentAge: 34,
      birthCity: "Laval",
      birthStateProvince: "QC",
      birthCountry: "CAN",
      nationality: "CAN",
      height: "6' 0\"",
      weight: 185,
      active: true,
      alternateCaptain: false,
      captain: false,
      rookie: false,
      shootsCatches: "L",
      rosterStatus: "I",
      currentTeam: {
        id: 1,
        name: "New Jersey Devils",
        link: "/api/v1/teams/1",
      },
      primaryPosition: {
        code: "G",
        name: "Goalie",
        type: "Goalie",
        abbreviation: "G",
      },
    },
  ],
};

jest.mock("axios");

describe("<PlayerProfile />", () => {
  afterEach(cleanup);
  (axios.get as jest.Mock).mockResolvedValue({ data: { ...player } });
  it("should display the player's profile picture", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PlayerProfile />} />
        </Routes>
      </BrowserRouter>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      expect(screen.getByRole("player-profile-image")).toBeTruthy();
    });
  });
  it("should display the player's full name", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PlayerProfile />} />
        </Routes>
      </BrowserRouter>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));
    await waitFor(() => {
      expect(screen.getByRole("player-profile-full-name")).toHaveTextContent(
        "Jonathan Bernier"
      );
    });
  });
  it("should display the player's team name, number, and position", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PlayerProfile />} />
        </Routes>
      </BrowserRouter>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(3));
    await waitFor(() => {
      expect(
        screen.getByRole("player-profile-number-and-position")
      ).toHaveTextContent("#45 | Goalie");
    });
    await waitFor(() => {
      expect(screen.getByRole("player-profile-team-name")).toBeTruthy();
    });
  });
  it("should display the player's captain or alternate captain status", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PlayerProfile />} />
        </Routes>
      </BrowserRouter>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(4));
    await waitFor(() => {
      expect(
        screen.getByRole("player-profile-not-a-captain-chip")
      ).toBeTruthy();
    });
  });
  it("should display the player's rookie status", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PlayerProfile />} />
        </Routes>
      </BrowserRouter>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(5));
    await waitFor(() => {
      expect(screen.getByRole("player-profile-not-a-rookie-chip")).toBeTruthy();
    });
  });
  it("should display the player's team logo", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PlayerProfile />} />
        </Routes>
      </BrowserRouter>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(6));
    await waitFor(() => {
      expect(screen.getByRole("player-profile-team-logo")).toBeTruthy();
    });
  });
});
