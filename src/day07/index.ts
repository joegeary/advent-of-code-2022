import run from "aocrunner";

type Command = {
  type: 'command';
  operation: 'cd' | 'ls';
  arg?: string;
}

type File = {
  type: 'file';
  size: number;
  name: string;
}

type Dir = {
  type: 'dir';
  size: null;
  name: string;
}

type Entries = (Command | File | Dir)[];

type Disk = {
  [key: string]: Disk | number;
}

const recreateDisk = (entries: Entries) => {
  const disk: Disk = {};
  const path: string[] = [];

  const createFileOrDir = (name: string, val: number | {} = {}) => {
    let cwd = disk;

    path.forEach((step) => {
      if (cwd[step] === undefined) {
        cwd[step] = {} as Disk;
      }
      cwd = cwd[step] as Disk;
    })

    cwd[name] = val;
  }

  for (const entry of entries) {
    switch (entry.type) {
      case 'command': {
        switch (entry.operation) {
          case 'ls':
            break;
          case 'cd':
            if (entry.arg === '..') {
              path.pop();
            } else if (entry.arg === '/') {
              path.length = 0;
            } else {
              path.push(entry.arg as string);
            }
            break;
        }
        break;
      }

      case 'dir': {
        createFileOrDir(entry.name);
        break;
      }

      case 'file': {
        createFileOrDir(entry.name, entry.size);
        break;
      }
    }
  }

  return disk;
}

const parseInput = (rawInput: string) => {
  const entries = rawInput.split('\n').map((line) => {
    if (line.startsWith('$')) {
      const [operation, arg] = line.split(' ').slice(1);
      return { type: 'command', operation, arg } as Command;
    }

    const [dirOrSize, name] = line.split(' ');

    if (dirOrSize === 'dir') {
      return {
        type: 'dir',
        name,
      } as Dir;
    }

    return {
      type: 'file',
      size: Number(dirOrSize),
      name,
    } as File;
  })

  return recreateDisk(entries);
}

const getDirSizes = (rawInput: string) => {
  const input = parseInput(rawInput);
  const dirSizes: number[] = [];

  const recur = (disk: Disk) => {
    let size = 0;

    for (const [, val] of Object.entries(disk)) {
      size += typeof val === 'number' ? val : recur(val);
    }

    dirSizes.push(size);
    return size;
  }

  recur(input);
  return dirSizes;
}

const part1 = (rawInput: string) => {
  return getDirSizes(rawInput)
    .filter((size) => size <= 100_000)
    .reduce((acc, size) => acc + size, 0);
}

const part2 = (rawInput: string) => {
  const dirSizes = getDirSizes(rawInput).sort((a, b) => a - b);
  const free = 70_000_000 - (dirSizes.at(-1) ?? 0);
  const required = 30_000_000 - free;

  return dirSizes.find((size) => size >= required);
};

const testInput = `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 95_437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 24_933_642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
