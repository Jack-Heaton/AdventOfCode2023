const {readFileSync} = require("fs");

const test = 
`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;


const input = readFileSync('./5/data.txt').toString();


function getLocations( s, expanded ) {

  const mapStrings = s.split("\n\n");

  let source;

  for( const [mi, m] of mapStrings.entries()) {

    if( m.startsWith('seeds:')) {
      source = m.split(':')[1].trim().split(' ').map(BigInt)

      if(expanded) {
        source = source.reduce((n, s, i) => {

          if(i % 2 === 0) {
            for(let start = s; start < s + source[i+1]; start++) {
              n.push(start)
            }
          }


          return n;

        }, [])
      }

    } else {
      const [name, ...lines] = m.split('\n');
      const map = lines.map(l => {
          const [stop, start, range] = l.split(' ').map(BigInt);
          return { start, startMax : start + range - 1n, destOffset : stop - start}
        })
      
      

      for( const [i,s] of source.entries()) {

        for( const m of map ) {
          if( s >= m.start && s <= m.startMax) {
            source[i] = s + m.destOffset;
            break;
          }
        }

        
      }

    }
  }


  return {part1: source.reduce((min, s) => s < min ? s : min, Infinity)}
}

console.log(getLocations(test), getLocations(test, true))
console.log(getLocations(input), getLocations(input, true))