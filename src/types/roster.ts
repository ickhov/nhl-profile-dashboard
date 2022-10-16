import Player from "./player";
import PrimaryPosition from "./primary-position";

export default interface Roster {
  person: {
    id: Player["id"];
    fullName: Player["fullName"];
    link: Player["link"];
  };
  jerseyNumber: number;
  position: PrimaryPosition;
}
