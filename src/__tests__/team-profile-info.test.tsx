import { cleanup, render, screen } from "@testing-library/react";
import { TeamProfileInfo } from "../pages";

const team = {
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
  shortName: "New Jersey",
  officialSiteUrl: "http://www.newjerseydevils.com/",
  franchiseId: 23,
  active: true,
};

describe("<TeamProfileInfo />", () => {
  afterEach(cleanup);
  it("should display the team's conference", async () => {
    render(<TeamProfileInfo tab={1} index={1} data={team} />);
    expect(
      screen.getByRole("player-profile-info-card-conference-title")
    ).toHaveTextContent("Conference");
    expect(
      screen.getByRole("player-profile-info-card-conference-content")
    ).toHaveTextContent("Eastern");
  });
  it("should display the team's division", async () => {
    render(<TeamProfileInfo tab={1} index={1} data={team} />);
    expect(
      screen.getByRole("player-profile-info-card-division-title")
    ).toHaveTextContent("Division");
    expect(
      screen.getByRole("player-profile-info-card-division-content")
    ).toHaveTextContent("Metropolitan");
  });
  it("should display the team's venue", async () => {
    render(<TeamProfileInfo tab={1} index={1} data={team} />);
    expect(
      screen.getByRole("player-profile-info-card-venue-title")
    ).toHaveTextContent("Venue");
    expect(
      screen.getByRole("player-profile-info-card-venue-content")
    ).toHaveTextContent("Prudential Center");
  });
});
