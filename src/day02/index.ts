import run from 'aocrunner';

enum Hand {
  rock = 1,
  paper = 2,
  scissors = 3,
}

enum Strategy {
  win,
  draw,
  lose,
}

const toHand = (value: string) => ({
  'A': Hand.rock,
  'B': Hand.paper,
  'C': Hand.scissors,
  'X': Hand.rock,
  'Y': Hand.paper,
  'Z': Hand.scissors,
}[value])

const toStrategy = (value: string) => ({
  'X': Strategy.lose,
  'Y': Strategy.draw,
  'Z': Strategy.win,
}[value])

const scoreRound = (handA: Hand, handB: Hand) => {
  let score = 0;
  
  if (handA === handB)
    score = 3;
  if (
    (handA === Hand.rock && handB === Hand.paper) ||
    (handA === Hand.paper && handB === Hand.scissors) ||
    (handA === Hand.scissors && handB === Hand.rock)
  )
    score = 6;

  return handB.valueOf() + score;
}

const parseInput = (rawInput: string) => {
  return rawInput.split('\n')
};

const toHandAndStrategy = (line: string): [Hand, Strategy] => {
  const [part1, part2] = line.split(' ');
  return [toHand(part1)!, toStrategy(part2)!];
}

const determineHand = (otherHand: Hand, strategy: Strategy) => {
  if (strategy === Strategy.draw) {
    return otherHand;
  }
  if (strategy === Strategy.lose) {
    return {
      [Hand.paper]: Hand.rock,
      [Hand.rock]: Hand.scissors,
      [Hand.scissors]: Hand.paper,
    }[otherHand];
  }
  if (strategy === Strategy.win) {
    return {
      [Hand.rock]: Hand.paper,
      [Hand.scissors]: Hand.rock,
      [Hand.paper]: Hand.scissors,
    }[otherHand];
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .map(line => line
      .split(' ')
      .map(toHand)
      .filter((v): v is Hand => !!v)
    );

  return input.reduce((total, [elf, you]) => {
    return total + scoreRound(elf, you);
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).map(toHandAndStrategy);

  return input.reduce((total, [otherHand, strategy]) => {
    const myHand = determineHand(otherHand, strategy);
    return total + scoreRound(otherHand, myHand!);
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
          A Y
          B X
          C Z
        `,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          A Y
          B X
          C Z
        `,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});