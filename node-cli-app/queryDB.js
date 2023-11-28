import fs from "fs";
import { MongoClient } from "mongodb";
// import dbFileCheck from "./dbFileCheck";
// import { exit } from "process";
export default async function queryDB(externalFunction) {
  try {
    let info = [];

    const url = "mongodb://localhost:27017/"; 

    // Create a new MongoClient
    const client = new MongoClient(url);

    // Connect to the MongoDB server
    await client.connect();

    console.log("Connected successfully to the server");

    // Use the client to interact with the database
    const db = client.db();

    // Perform database operations
    // Example: Insert a document
    const collection = db.collection("mycollection");

    if (fs.existsSync("db.json" )) {
     await fs.readFile("db.json", function (err, data) {
        if (err) {
          console.log("reading file  error", err);
          return;
        }
        info = JSON.parse(data.toString());
        console.log(JSON.parse(data.toString()));
        if (externalFunction && !err) {
          externalFunction({info,collection});
          return;
        }
      });
    } else {
      if (externalFunction) {
        externalFunction({info,collection});
        return;
      }
    }
    // if (fs.existsSync("db.json")) {
    //   await fs.readFile("db.json", function (err, data) {
    //     if (err) {
    //       console.log("reading file  error", err);
    //       return;
    //     }
    //     info = JSON.parse(data.toString());
    //     console.log(JSON.parse(data.toString()));
    //     if (externalFunction && !err) {
    //       externalFunction(info);
    //       return;
    //     }
    //   });
    // } else {
    //   if (externalFunction) {
    //     externalFunction(info);
    //     return;
    //   }
    // }
  } catch (error) {
    console.log("some thing went wrong", err);
  }
}



