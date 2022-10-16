import Conference from "./conference";
import Division from "./division";
import Franchise from "./franchise";
import Venue from "./venue";

export default interface Team {
  id: number;
  name: string;
  link: string;
  venue: Venue;
  abbreviation: string;
  teamName: string;
  locationName: string;
  firstYearOfPlay: string;
  division: Division;
  conference: Conference;
  franchise: Franchise;
  shortName: string;
  officialSiteUrl: string;
  franchiseId: number;
  active: boolean;
}
