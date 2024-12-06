// day 5 p2
const fs = require("node:fs");
const path = require("node:path");
fs.readFile(path.join(process.cwd(), "message.txt"), "utf8", (err, text) => {
  if (err) {
    return;
  }

  const [rawOrders, rawUpdates] = text.split("\r\n\r\n");

  const pageOrders = rawOrders
    .split("\r\n")
    .map((o) => o.split("|").map((k) => parseInt(k)));
  const updates = rawUpdates
    .split("\r\n")
    .map((u) => u.split(",").map((k) => parseInt(k)));

  const incorrectUpdates = [];

  let listOk;
  for (let i = 0; i < updates.length; i++) {
    const updateList = updates[i];
    listOk = true;
    let needRestart = false;

    // cycle each page in current update line
    for (let pageIndex = 0; pageIndex < updateList.length; pageIndex++) {
      const page = updateList[pageIndex];

      // cycle each order line
      for (let orderIndex = 0; orderIndex < pageOrders.length; orderIndex++) {
        const order = pageOrders[orderIndex];

        //get index of current page in the order line
        const pageIndexInCurrentOrder = order.indexOf(page);

        // if not found, skip
        if (pageIndexInCurrentOrder < 0) continue;

        // if page is first in the order line
        if (pageIndexInCurrentOrder == 0) {
          const nextPage = order[1];
          const nextPageIndex = updateList.indexOf(nextPage);
          if (nextPageIndex < 0) continue;
          if (pageIndex < nextPageIndex) continue;
          // invert numbers, mark as not ok and mark as restart
          updateList[pageIndex] = nextPage;
          updateList[nextPageIndex] = page;
          listOk = false;
          needRestart = true;
          break;
        }

        // if page is second  in the order line
        if (pageIndexInCurrentOrder == 1) {
          const prevPage = order[0];
          const prevPageIndex = updateList.indexOf(prevPage);
          if (prevPageIndex < 0) continue;
          if (pageIndex > prevPageIndex) continue;
          // invert numbers, mark as not ok and mark as restart
          updateList[pageIndex] = prevPage;
          updateList[prevPageIndex] = page;
          listOk = false;
          needRestart = true;
          break;
        }
      }

      if (needRestart) {
        needRestart = false;
        pageIndex = -1;
      }
    }

    if (!listOk) incorrectUpdates.push(updateList);
  }

  let sum = 0;
  incorrectUpdates.forEach((update) => {
    sum += update[(update.length - 1) / 2];
  });

  console.log(sum);
});
