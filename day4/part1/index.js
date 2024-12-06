// day 4 p1
const fs = require("node:fs");
const path = require("node:path");
fs.readFile(path.join(process.cwd(), "message.txt"), "utf8", (err, text) => {
  if (err) {
    return;
  }

  const matrix = text.split("\r\n").map((row) => row.split(""));

  let totalCount = 0;

  for (let col = 0; col < matrix.length; col++) {
    for (let row = 0; row < matrix[col].length; row++) {
      let char = matrix[col][row];

      let testString;

      if (char === "X") {
        // test forward
        try {
          testString = char;
          for (let incr = 1; incr <= 3; incr++) {
            let nextChar = matrix[col][row + incr];
            if (nextChar !== undefined) testString = `${testString}${nextChar}`;
          }
          if (testString === "XMAS") totalCount++;
        } catch {}

        // test backwards
        try {
          testString = char;
          for (let incr = 1; incr <= 3; incr++) {
            let nextChar = matrix[col][row - incr];
            if (nextChar !== undefined) testString = `${testString}${nextChar}`;
          }
          if (testString === "XMAS") totalCount++;
        } catch {}

        //test up
        try {
          testString = char;
          for (let incr = 1; incr <= 3; incr++) {
            let nextChar = matrix[col + incr][row];
            if (nextChar !== undefined) testString = `${testString}${nextChar}`;
          }
          if (testString === "XMAS") totalCount++;
        } catch {}

        //test down
        try {
          testString = char;
          for (let incr = 1; incr <= 3; incr++) {
            let nextChar = matrix[col - incr][row];
            if (nextChar !== undefined) testString = `${testString}${nextChar}`;
          }
          if (testString === "XMAS") totalCount++;
        } catch {}

        //test up-left
        try {
          testString = char;
          for (let incr = 1; incr <= 3; incr++) {
            let nextChar = matrix[col - incr][row - incr];
            if (nextChar !== undefined) testString = `${testString}${nextChar}`;
          }
          if (testString === "XMAS") totalCount++;
        } catch {}

        //test up-right
        try {
          testString = char;
          for (let incr = 1; incr <= 3; incr++) {
            let nextChar = matrix[col - incr][row + incr];
            if (nextChar !== undefined) testString = `${testString}${nextChar}`;
          }
          if (testString === "XMAS") totalCount++;
        } catch {}

        //test down-left
        try {
          testString = char;
          for (let incr = 1; incr <= 3; incr++) {
            let nextChar = matrix[col + incr][row - incr];
            if (nextChar !== undefined) testString = `${testString}${nextChar}`;
          }
          if (testString === "XMAS") totalCount++;
        } catch {}

        //test down-right
        try {
          testString = char;
          for (let incr = 1; incr <= 3; incr++) {
            let nextChar = matrix[col + incr][row + incr];
            if (nextChar !== undefined) testString = `${testString}${nextChar}`;
          }
          if (testString === "XMAS") totalCount++;
        } catch {}
      }
    }
  }

  console.log(totalCount);
});
