import { addFundDetails } from "./04.addFundDetails.js";

async function run() {
  console.log("Starting data pipeline...");
  await addFundDetails();
  console.log("Data pipeline completed");
}

run();