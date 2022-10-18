import { cleanup, render, screen } from "@testing-library/react";
import { PlayerProfileInfo } from "../pages";

const player = {
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
};

describe("<PlayerProfileInfo />", () => {
  afterEach(cleanup);
  it("should display the player's age", async () => {
    render(<PlayerProfileInfo data={player} />);
    expect(
      screen.getByRole("player-profile-info-row-age-title")
    ).toHaveTextContent("Age");
    expect(
      screen.getByRole("player-profile-info-row-age-content")
    ).toHaveTextContent("34 years old");
  });
  it("should display the player's height", async () => {
    render(<PlayerProfileInfo data={player} />);
    expect(
      screen.getByRole("player-profile-info-row-height-title")
    ).toHaveTextContent("Height");
    expect(
      screen.getByRole("player-profile-info-row-height-content")
    ).toHaveTextContent("6' 0\"");
  });
  it("should display the player's weight", async () => {
    render(<PlayerProfileInfo data={player} />);
    expect(
      screen.getByRole("player-profile-info-row-weight-title")
    ).toHaveTextContent("Weight");
    expect(
      screen.getByRole("player-profile-info-row-weight-content")
    ).toHaveTextContent("185 lbs");
  });
  it("should display the player's shooting & catching hand", async () => {
    render(<PlayerProfileInfo data={player} />);
    expect(
      screen.getByRole("player-profile-info-row-shooting-&-catching-hand-title")
    ).toHaveTextContent("Shooting & Catching Hand");
    expect(
      screen.getByRole(
        "player-profile-info-row-shooting-&-catching-hand-content"
      )
    ).toHaveTextContent("Left");
  });
  it("should display the player's nationality", async () => {
    render(<PlayerProfileInfo data={player} />);
    expect(
      screen.getByRole("player-profile-info-row-nationality-title")
    ).toHaveTextContent("Nationality");
    expect(
      screen.getByRole("player-profile-info-row-nationality-content")
    ).toHaveTextContent("CAN");
  });
  it("should display the player's captain", async () => {
    render(<PlayerProfileInfo data={player} />);
    expect(
      screen.getByRole("player-profile-info-row-captain-title")
    ).toHaveTextContent("Captain");
    expect(
      screen.getByRole("player-profile-info-row-captain-content")
    ).toHaveTextContent("No");
  });
  it("should display the player's rookie", async () => {
    render(<PlayerProfileInfo data={player} />);
    expect(
      screen.getByRole("player-profile-info-row-rookie-title")
    ).toHaveTextContent("Rookie");
    expect(
      screen.getByRole("player-profile-info-row-rookie-content")
    ).toHaveTextContent("No");
  });
});
