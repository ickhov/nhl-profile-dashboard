import React from "react";

export default interface TeamTable {
  id: number;
  name: string;
  conferenceName: string;
  divisionName: string;
  Action: string | React.ReactNode;
}