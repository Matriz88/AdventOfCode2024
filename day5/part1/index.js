// day 5 p1
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

  const correctUpdates = [];

  for (let i = 0; i < updates.length; i++) {
    const updateList = updates[i];
    let listOk = true;

    // cycle each page in current update line
    pageListCycle: for (
      let pageIndex = 0;
      pageIndex < updateList.length;
      pageIndex++
    ) {
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
          listOk = false;
          break pageListCycle;
        }
        // if page is second  in the order line
        if (pageIndexInCurrentOrder == 1) {
          const prevPage = order[0];
          const prevPageIndex = updateList.indexOf(prevPage);
          if (prevPageIndex < 0) continue;
          if (pageIndex > prevPageIndex) continue;
          listOk = false;
          break pageListCycle;
        }
      }
    }

    if (listOk) correctUpdates.push(updateList);
  }

  let sum = 0;
  correctUpdates.forEach((update) => {
    sum += update[(update.length - 1) / 2];
  });

  console.log(sum);
});
