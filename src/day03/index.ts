import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const calcPriority = (item?: string) => {
  if (!item) return 0;
  const code = item.charCodeAt(0);
  return code > 96 ? code - 96 : code - 38;
}

const findMatch = (arr: string[][]) => arr.reduce((p, c) => p.filter(e => c.includes(e)));

const splitGroups = (str: string) => {
  var list = str.split('\n');
  var list2 =[];
  for (var i=0;i<list.length; i+=3){
    list2.push([list[i], list[i+1], list[i+2]]);
  }
  return list2;
};

const part1 = (rawInput: string) => {
  const sacks = parseInput(rawInput).split('\n');
  return sacks.reduce((total, s) => {
    const c1 = [...s];
    const c2 = c1.splice(s.length / 2);
    const match = findMatch([c1, c2])[0];

    return total + calcPriority(match);
  }, 0);
};

const part2 = (rawInput: string) => {
  const groups = splitGroups(parseInput(rawInput));
  console.log(groups);
  return groups.reduce((total, g) => {
    const elves = g.map(e => e.split(''));
    const match = findMatch(elves)[0];

    return total + calcPriority(match);
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
          vJrwpWtwJgWrhcsFMMfFFhFp
          jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
          PmmdzqPrVvPwwTWBwg
          wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
          ttgJtRGJQctTZtZT
          CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          vJrwpWtwJgWrhcsFMMfFFhFp
          jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
          PmmdzqPrVvPwwTWBwg
          wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
          ttgJtRGJQctTZtZT
          CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
