import fs from "fs/promises";

async function run() {
  const data = await fs.readFile("./data/sample.txt", "utf-8");
  const fundData = JSON.parse(data);

  let count = 0;

  fundData.forEach(fund => {
    const name = fund.schemeName.toLowerCase();

    const isGrowth = name.includes("growth");
    const isDirect = name.includes("direct");

    const isBonus = name.includes("bonus");
    const isIDCW = name.includes("idcw");


    const isMidCap =
      name.includes("mid cap") ||
      name.includes("midcap") ||
      name.includes("mid ");

    const isLargeCap = name.includes("large");
    const isSmallCap = name.includes("small");
    const isMultiCap = name.includes("multi");

    if (
      isGrowth &&
      isDirect &&
      isMidCap &&
      !isLargeCap &&
      !isSmallCap &&
      !isMultiCap &&
      !isBonus &&
      !isIDCW
    ) {
      console.log(fund.schemeName);
      count++;
    }
  });

  console.log(
    "Total Mid Cap Growth (Direct) Funds:",
    count
  );
}

run().catch(err => {
  console.error("Error:", err);
});
