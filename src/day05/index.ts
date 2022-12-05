import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const [crates, rawMoves] = rawInput.split('\n\n').map((line) => line.split('\n'));

  const header = crates.pop()?.split('')!;
  const stacks = header.reduce<string[][]>((acc, cur, idx) => {
    if (!cur.trim()) return acc;

    const stack: string[] = [];
    crates.forEach((line) => {
      const crate = line.split('').at(idx);
      if (crate && crate.trim()) {
        stack.push(line[idx]);
      }
    });

    return [...acc, [...stack.reverse()]]
  }, []);

  const moves = rawMoves.map((move) => {
    const [, qty, , from, , to] = move.split(' ').map(Number);
    return { qty, from: from - 1, to: to - 1 };
  });

  return { stacks, moves };
};

const part1 = (rawInput: string) => {
  const {stacks, moves} = parseInput(rawInput);

  moves.forEach((move) => {
    for (let i = 1; i <= move.qty; i++) {
      const crate = stacks[move.from].pop();
      stacks[move.to].push(crate!);
    }
  });

  return stacks.map((stack) => stack.at(-1)).join('');
};

const part2 = (rawInput: string) => {
  const {stacks, moves} = parseInput(rawInput);

  moves.forEach((move) => {
    const crates = stacks[move.from].splice(-move.qty);
    stacks[move.to] = stacks[move.to].concat(crates);
  });

  return stacks.map((stack) => stack.at(-1)).join('');
};

run({
  part1: {
    tests: [
      {
        input: `
    [D]     
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
    [D]     
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
