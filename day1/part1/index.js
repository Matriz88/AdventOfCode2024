const fs = require("node:fs");
const path = require("node:path");
fs.readFile(path.join(process.cwd(), "message.txt"), "utf8", (err, text) => {
  if (err) {
    return;
  }

  const input = text.split("\n");

  let left = [];
  let right = [];

  input.forEach((el) => {
    let [a, b] = el.split("   ");
    left.push(a);
    right.push(b);
  });

  left.sort();
  right.sort();

  let sum = 0;
  for (let index = 0; index < left.length; index++) {
    sum += Math.abs(left[index] - right[index]);
  }

  console.log(sum);
});
