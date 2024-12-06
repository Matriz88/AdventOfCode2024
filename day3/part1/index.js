const fs = require("node:fs");
const path = require("node:path");
fs.readFile(path.join(process.cwd(), "message.txt"), "utf8", (err, text) => {
  if (err) {
    return;
  }

  const regex = /mul\((\d+,\d+)\)/g;
  const matches = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    matches.push(match[1]);
  }

  let sum = 0;
  matches.forEach((element) => {
    const [a, b] = element.split(",");
    sum += a * b;
  });

  console.log(sum);
});
