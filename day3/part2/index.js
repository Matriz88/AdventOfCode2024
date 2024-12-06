const fs = require("node:fs");
const path = require("node:path");
fs.readFile(path.join(process.cwd(), "message.txt"), "utf8", (err, text) => {
  if (err) {
    return;
  }

  const regex = /mul\((?<numbers>\d+,\d+)\)|(?<dont>don't\(\))|(?<do>do\(\))/g;

  const matches = [];
  let match;

  let enabled = true;

  while ((match = regex.exec(text)) !== null) {
    if (match.groups == null) continue;
    if (match.groups.do !== undefined || match.groups.dont !== undefined) {
      enabled =
        (match.groups.do !== undefined || match.groups.dont === undefined) ??
        false;
      continue;
    }
    if (enabled) matches.push(match[1]);
  }

  let sum = 0;
  matches.forEach((element) => {
    const [a, b] = element.split(",");
    sum += a * b;
  });

  console.log(sum);
});
