import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n\n')
  .map(elf => sum(elf
    .split('\n')
    .map(Number))
);
  
const sum = (arr: number[]) => arr
.reduce((total, num) => total + num, 0)

const part1 = (rawInput: string) => {
  const calories = parseInput(rawInput);
  return Math.max(...calories);
};

const part2 = (rawInput: string) => {
  const calories = parseInput(rawInput).sort((a, b) => b - a);
  return sum(calories.slice(0, 3));
};

run({
  part1: {
    tests: [
      {
        input: `1000
                2000
                3000

                4000

                5000
                6000

                7000
                8000
                9000

                10000`,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `1000
                2000
                3000

                4000

                5000
                6000

                7000
                8000
                9000

                10000`,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
