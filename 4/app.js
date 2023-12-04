const {readFileSync} = require("fs");

const test = 
`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;


const input = readFileSync('./4/data.txt').toString();


function scoreCard( s ) {

  let part1 = 0;

  let cardMap = {};

  const lines = s.split("\n");

  const cardCount = lines.length;

  for( const [il, line] of lines.entries() ) {

    const [numberString, winnersString] = line.split("|");

    const cardNumber = numberString.substring(0, numberString.indexOf(":")).replace("Card ","").trim();

    const numbers = numberString.substring(numberString.indexOf(":") + 1).trim().split(" ").reduce((acc,n) => {
      if(n) acc[n] = true;
      return acc;
    }, {});


    let score;
    let winCount = 0;
    let wonCards = [];


    const winners = winnersString.trim().split(" ").forEach((w) => {
      if(w && numbers[w]) {
        score = !score ? 1 : score * 2;
        winCount++;
        if(winCount >= 1) {
          const nextCard = Number(cardNumber) + winCount;
          if(nextCard <= cardCount) {
            wonCards.push( `${Number(cardNumber) + winCount}`)
            lastCard = cardNumber
          }
        }
      }

    });

    part1 += score ? score : 0;

    cardMap[cardNumber] = {wonCards, expanded: [cardNumber]};

  }

  let part2 = 0;

  for( const m in cardMap) {

    const cm = cardMap[m]

    while (cm.wonCards.length) {
      const card = cm.wonCards.shift();
      cm.expanded.push(card);
      cm.wonCards.push(...cardMap[card].wonCards)
    }
  
    part2 += cm.expanded.length
  }

  return {part1, part2}
}

console.log(scoreCard(test))
// console.log(scoreCard(input))