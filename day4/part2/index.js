// day 4 p2
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

      if (char === "A") {
        let partialCount = 0;

        // check diagonal \
        try {
          let newCoord = { col: col - 1, row: row - 1 };
          testString = matrix[newCoord.col][newCoord.row];
          for (let incr = 1; incr <= 2; incr++) {
            let nextChar = matrix[newCoord.col + incr][newCoord.row + incr];
            if (nextChar !== undefined) testString = `${testString}${nextChar}`;
          }
          if (testString === "MAS" || testString === "SAM") partialCount++;
        } catch {}

        // check diagonal /
        try {
          let newCoord = { col: col - 1, row: row + 1 };
          testString = matrix[newCoord.col][newCoord.row];

          for (let incr = 1; incr <= 2; incr++) {
            let nextChar = matrix[newCoord.col + incr][newCoord.row - incr];
            if (nextChar !== undefined) testString = `${testString}${nextChar}`;
          }
          if (testString === "MAS" || testString === "SAM") partialCount++;
        } catch {}

        if (partialCount == 2) totalCount++;
      }
    }
  }

  console.log(totalCount);
});
