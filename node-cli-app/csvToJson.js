import fs from "fs";
import csv from "csv-parser";
import queryDB from "./queryDB.js";

export default async function csvToJson() {
    const inputPath = process.argv[2];
    const outputPath = ("output.json");
    const JsonArray = [];
    await fs
        .createReadStream(inputPath)
        .pipe(csv())
        .on("data", (data) => JsonArray.push(data))
        .on("end", () => {
            fs.writeFile(outputPath, JSON.stringify(JsonArray, null, 2), (err) => {
                if (err) {
                    console.log("errror with writng the json format", err);
                } else {
                    console.log("CSV file successfully converted to Json");
                }
            });
        });
}
queryDB(csvToJson);
