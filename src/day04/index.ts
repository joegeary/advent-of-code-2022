import run from "aocrunner";

type Range = {
  start: number;
  end: number;
}

const parseInput = (rawInput: string) => rawInput;

const getElves = (p: string) => p.split(',').map(e => {
  const range = e.split('-');
  return {
    start: Number(range[0]),
    end: Number(range[1])
  } as Range;
});

const contains = (a: Range, b: Range) => (a.start >= b.start && a.end <= b.end) || (b.start >= a.start && b.end <= a.end);

const intersects = (a: Range, b: Range) => {
  const min = (a.start < b.start ? a : b);
  const max = (min === a ? b : a);

  return min.end >= max.start;
}

const part1 = (rawInput: string) => {
  return parseInput(rawInput)
    .split('\n')
    .filter(p => {
      const [elf1, elf2] = getElves(p);
      return contains(elf1, elf2);
    })
    .length;
};

const part2 = (rawInput: string) => {
  return parseInput(rawInput)
    .split('\n')
    .filter(p => {
      const [elf1, elf2] = getElves(p);
      return intersects(elf1, elf2);
    })
    .length;
};

run({
  part1: {
    tests: [
      {
        input: `
          2-4,6-8
          2-3,4-5
          5-7,7-9
          2-8,3-7
          6-6,4-6
          2-6,4-8
        `,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          2-4,6-8
          2-3,4-5
          5-7,7-9
          2-8,3-7
          6-6,4-6
          2-6,4-8
        `,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
