import run from "aocrunner";

type Distance = {
  top: number;
  right: number;
  down: number;
  left: number;
  total: number;
}

const parseInput = (rawInput: string) => rawInput.split('\n').map(line => [...line].map(Number));

const buildVisible = (heights: number[][]) => {
  return heights.map((rh) => rh.map(h => false));
}

const checkVisibility = (heights: number[][], visibility: boolean[][]) => {
  return visibility.map((row, r) => {
    row.forEach((v, i) => {
      if (i === 0 || (heights[r].slice(0, i).every((el) => el < heights[r][i])))
        row[i] = true;
    });

    return row;
  })
};

const rotateMatrix = <Type>(matrix: Type[][]): Type[][] => {
  return matrix[0].map((_, index) => matrix.map(row => row[index]).reverse())
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const h = input.length;
  const w = input[0].length;
  const visible = input.map((row) => row.map(() => 0));

  for (let r = 0; r < h; ++r) {
      let p = -1;
      for (let c = 0; c < w; ++c) {
          if (input[r][c] > p) visible[r][c] = 1;
          p = Math.max(p, input[r][c]);
      }
      p = -1;
      for (let c = w - 1; c >= 0; --c) {
          if (input[r][c] > p) visible[r][c] = 1;
          p = Math.max(p, input[r][c]);
      }
  }
  
  for (let c = 0; c < w; ++c) {
      let p = -1;
      for (let r = 0; r < h; ++r) {
          if (input[r][c] > p) visible[r][c] = 1;
          p = Math.max(p, input[r][c]);
      }
      p = -1;
      for (let r = h - 1; r >= 0; --r) {
          if (input[r][c] > p) visible[r][c] = 1;
          p = Math.max(p, input[r][c]);
      }
  }

  return visible
    .flat()
    .reduce((acc, cur) => acc + (cur ? 1 : 0), 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const h = input.length;
  const w = input[0].length;

  const go = (r: number, c: number, d: number[], val: number): number => {
    if (r < 0 || c < 0 || r === h || c === w) return 0;
    if (input[r][c] >= val) return 1;
    return 1 + go(r + d[0], c + d[1], d, val);
  };

  let max = 0;
  
  for (let r = 0; r < h; ++r) {
      for (let c = 0; c < w; ++c) {
          let p = 1;
          for (const dir of [
              [0, 1],
              [1, 0],
              [0, -1],
              [-1, 0],
          ]) {
              p *= go(r + dir[0], c + dir[1], dir, input[r][c]);
          }
          max = Math.max(max, p);
      }
  }

  return max;
};

const testInput = `
30373
25512
65332
33549
35390
`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
