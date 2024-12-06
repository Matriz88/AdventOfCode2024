// day 2 part 1
const fs = require("node:fs");
const path = require("node:path");

const checkSafety = (sequence) => {
  let isIncreasing = undefined;

  let diffs = [];

  for (let i = 1; i < sequence.length; i++) {
    diffs.push(sequence[i] - sequence[i - 1]);
  }

  if (diffs.some((diff) => diff === 0)) return false;

  let firstNonZeroDiff = diffs.find((diff) => diff !== 0);
  if (firstNonZeroDiff === undefined) return false;

  isIncreasing = firstNonZeroDiff > 0;

  for (let diff of diffs) {
    if (
      (isIncreasing && diff <= 0) ||
      (!isIncreasing && diff >= 0) ||
      Math.abs(diff) < 1 ||
      Math.abs(diff) > 3
    )
      return false;
  }

  return true;
};

fs.readFile(path.join(process.cwd(), "message.txt"), "utf8", (err, text) => {
  if (err) {
    return;
  }

  const input = text.split("\r\n");

  let validLevels = 0;

  input.forEach((level) => {
    let sequence = level.split(" ").map((num) => parseInt(num));

    let count = sequence.length;
    let testSequence = sequence;
    while (!checkSafety(testSequence) && count-- && count >= 0) {
      testSequence = sequence.slice(0, count).concat(sequence.slice(count + 1));
    }

    if (count >= 0) validLevels++;
  });

  console.log(validLevels);
});
