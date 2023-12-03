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
`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const test2 =
`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

const input = readFileSync('./1/data.txt').toString();

function extractNumbers(line, subbed = false) {


    let firstInt, lastInt, string = '';

    let charIndex = 0;

    for( let char of line.split('')) {

      if(subbed) {
        
        for(const key in numberMap) {
          if(line.substring(charIndex,charIndex + key.length) === key) {
            char = numberMap[key];
          }
        }
      }


      if( /[0-9]/.test(char)) {
        if(!firstInt) {
          firstInt = char;
        } else {
          lastInt = char;
        }
      } else {
          string += char;
      }
      charIndex++
    }
    lastInt = lastInt || firstInt;

    return {
      firstInt,
      lastInt,
      string
    }
  
}


function readCalibration(s, subbed) {
  const parsed = []

  for( const line of s.split('\n')) {
  
    const {firstInt, lastInt, string} = extractNumbers(line, subbed)

    parsed.push([ Number(`${firstInt}${lastInt}`), string])
  }

  return  parsed.reduce((c, l) => l[0] + c,0)
}


console.log({
  'Part 1 Test': readCalibration(test),
  'Part 2 Test' : readCalibration(test2, true)
});

console.log({
  'Part 1': readCalibration(input),
  'Part 2' : readCalibration(input, true)
});