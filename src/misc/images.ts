const getTeamLogo = (teamId: string) =>
  `http://www-league.nhlstatic.com/nhl.com/builds/site-core/d1b262bacd4892b22a38e8708cdb10c8327ff73e_1579810224/images/logos/team/current/team-${teamId}-light.svg`;
const getPlayerLogo = (playerId: string) =>
  `http://nhl.bamcontent.com/images/headshots/current/168X168/${playerId}.jpg`;
  
export { getTeamLogo, getPlayerLogo };
