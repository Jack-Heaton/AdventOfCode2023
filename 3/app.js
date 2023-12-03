const {readFileSync} = require("fs");

const test = 
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592...35
......755.
...$.*....
.664.598..`;


const input = readFileSync('./3/data.txt').toString();


function getParts( s ) {
const partMap = [];
const symbolMap = {};
const gearMap = {};

  for( const [row, line] of s.split("\n").entries() ) {

    for( let col = 0; col < line.split("").length; col++ ) {

      if( /[0-9]/.test(line[col])) {

        const part = {
          x: col,
          y: row,
          s: '',
        }

        while( /[0-9]/.test(line[col]) ) {
          part.s += line[col];
          col++;
        }

        part.value = parseInt(part.s);

        partMap.push(part);

      } 
      
      if ( line[col] && /[^0-9.]/.test(line[col])) {
        symbolMap[`${col},${row}`] = true;
        if(line[col] === '*') gearMap[`${col},${row}`] = { ratios: [] };
      }

    }
  }

    let part1 = 0;


    for( const part of partMap ) {
     
      const checkPoints = [];

      const rows = [ part.y - 1, part.y, part.y + 1];
      const cols = [];

      for( let x = part.x - 1; x <= part.x + part.s.length; x++) {
        cols.push(x);
      }

      for( const row of rows ) {
        for( const col of cols ) {
          checkPoints.push(`${col},${row}`);
        }
      }
      
      for( const point of checkPoints ) {
        if(symbolMap[point]) {
          if(!part.pass) {
            part1 += part.value;
            part.pass = true;
          }
        }

        if(gearMap[point]) {
          gearMap[point].ratios.push(part.value);
        }
      }

    }

    let part2 = 0;

    for( const gear in gearMap ) {
      if( gearMap[gear].ratios.length === 2 ) {
        const [first, second] = gearMap[gear].ratios;
        part2 += first * second;
      }

    }

    return {
      part1,
      part2,
    }; 


  }

console.log(getParts(test))
console.log(getParts(input))