const {readFileSync} = require("fs");

const test = 
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;


const input = readFileSync('./3/data.txt').toString();


function getParts( s ) {
const partMap = [];
const symbolMap = {};

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
      
      if ( /[^0-9.]/.test(line[col])) {
        symbolMap[`${col},${row}`] = true;
      }

    }
  }


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
          part.passed = true;
        }
      }

    }


    return {
      part1: partMap.reduce((acc, p) => acc + (p.passed ? p.value : 0), 0)
    }; 


  }

console.log(getParts(test))
console.log(getParts(input))