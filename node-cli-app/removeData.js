import inquirer from "inquirer";
import queryDB from "./queryDB.js";
import dbFileCheck from "./dbFileCheck.js";
import fs from "fs";

export default async function removeData(info) {
  dbFileCheck();
  try {
    const answer = await inquirer.prompt([
      { type: "input", name: "recordId", message: "Enter ID" }
    ]);
    let remainData = [];
    info.forEach((element) => {
      if (element.id!== answer.recordId) {
        remainData.push(element);    
      }
    fs.writeFile("db.json", JSON.stringify(remainData), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("deleted!");
        }
      });
    });
  } catch (error) {
    console.log("some thing went wrong", error);
  }
}

queryDB(removeData);
