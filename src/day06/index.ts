import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const hasRepeats = (str: string) => {
  return /(.).*\1/.test(str);
}

const getMarker = (input: string, distinct: number) => {
  for (let i = 0; i < input.length - distinct; i++) {
    const marker = input.substring(i, i + distinct);
    if (!hasRepeats(marker)) {
      return i + distinct;
    }
  }

  return -1;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return getMarker(input, 4);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return getMarker(input, 14);
};

run({
  part1: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 7,
      },
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 5,
      },
      {
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 6,
      },
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 10,
      },
      {
        input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 19,
      },
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 23,
      },
      {
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 23,
      },
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 29,
      },
      {
        input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
        expected: 26,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
