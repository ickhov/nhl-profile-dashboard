import TimeZone from "./timezone";

export default interface Venue {
  name: string;
  link: string;
  city: string;
  timeZone: TimeZone;
}
