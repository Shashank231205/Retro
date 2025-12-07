import fs from "fs";
import https from "https";
import csvParser from "csv-parser";
import { normalizeSaleRow } from "../utils/normalize.js"; // keep your existing file

let salesData = [];

// Download CSV from Google Drive
function downloadCSV(url, destination) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    https.get(url, (response) => {
      response.pipe(file);

      file.on("finish", () => {
        file.close(() => resolve(destination));
      });

      file.on("error", reject);
    });
  });
}

export async function loadSalesData() {
  try {
    const csvUrl = process.env.CSV_URL;
    if (!csvUrl) {
      console.error("❌ CSV_URL is not defined in environment variables");
      return;
    }

    const localPath = "./src/data/dataset.csv";

    console.log("📥 Downloading dataset from Google Drive...");
    await downloadCSV(csvUrl, localPath);

    console.log("📊 Parsing CSV...");
    const results = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(localPath)
        .pipe(csvParser())
        .on("data", (row) => results.push(normalizeSaleRow(row)))  // USE YOUR FUNCTION
        .on("end", resolve)
        .on("error", reject);
    });

    salesData = results;
    console.log(`✅ Loaded ${results.length} rows from Google Drive CSV`);
  } catch (err) {
    console.error("❌ Error loading CSV:", err);
  }
}

export function getSalesData() {
  return salesData;
}
