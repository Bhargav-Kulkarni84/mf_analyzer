import { createBatch } from "./06.createBatch.js";

async function run() {
  console.log("Starting data pipeline...");
  await createBatch();
  console.log("Data pipeline completed");
}

run();