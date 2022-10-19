# NHL Dashboard

This project displays basic information about NHL teams and players.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Runs the test files inside the __tests__ folder using Jest

### `npm run test:verbose`

Runs the test files inside the __tests__ folder using Jest including details about each individual tests.

## Available Paths

1. Home: http://localhost:3000

2. Teams Table: http://localhost:3000/teams \
**Note: You can search for teams using the autocomplete text field.**

3. Team Profile: http://localhost:3000/teams/{teamId} \
**Note: In the Roster tab, you can search for players using the autocomplete text field. You can click the player card to view their profile.**

4. Player Profile: http://localhost:3000/players/{playerId}


## Tests

I use Jest to perform component testing on the pages. The tests in the __tests__ folder has a counterpart in the pages folder. I only test to see if the necessary components and their values are rendered. I did not check their styling whatsoever.