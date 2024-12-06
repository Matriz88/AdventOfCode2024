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
    right.push(b.replace("\r", ""));
  });

  let sum = 0;
  left.forEach((num) => {
    let count = 0;
    right.forEach((num2) => {
      if (num === num2) count++;
    });
    sum += num * count;
  });

  console.log(sum);
});
