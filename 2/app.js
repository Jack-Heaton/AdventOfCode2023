const {readFileSync} = require("fs");

const numberMap = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
}

const test = 
`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;


const input = readFileSync('./2/data.txt').toString();

const check = [12,13,14];

function runGame( gameDataInput ) {

  const games = {};

  for (const game of gameDataInput.split("\n")) {
    const [ gameIdString, gameData] = game.split(":");
    const gameId = gameIdString.split(" ")[1];

    const cubePullData = gameData.split(";")

    const raw = cubePullData.map(pull => pull.split(",").map( p => p.trim()).reduce((c,p) => {
      const [ count, color] = p.split(" ");

      c[color === 'red' ? 0 : color === "green" ? 1 : 2] = parseInt(count)

      return c;
    }, [0,0,0]))

    const max = raw.reduce((c,r) => {
      c[0] = Math.max(c[0], r[0]);
      c[1] = Math.max(c[1], r[1]);
      c[2] = Math.max(c[2], r[2]);

      return c;
    }, [0,0,0])

    //Not asked, but just in case
    const sum = raw.reduce((c,r) => {
      c[0] = c[0] + r[0];
      c[1] = c[1] + r[1];
      c[2] = c[2] + r[2];
      return c;
    }, [0,0,0])


    games[gameId] = {
      raw,
      max,
      sum,
      part1Passed: max[0] <= check[0] && max[1] <= check[1] && max[2] <= check[2],
      power: max[0] * max[1] * max[2],
    }

  }

  const partOneSolution = Object.keys(games).reduce((c,g) => games[g].part1Passed ? c + parseInt(g) : c, 0)
  const partTwoSolution = Object.keys(games).reduce((c,g) => games[g].power + c , 0)

 return {partOneSolution, partTwoSolution} 
}

console.log(runGame(test));

console.log(runGame(input));