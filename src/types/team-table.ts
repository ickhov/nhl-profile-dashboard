import React from "react";

export default interface TeamTable {
  id: number;
  name: string;
  venueName: string;
  divisionName: string;
  Action: React.ReactNode;
}