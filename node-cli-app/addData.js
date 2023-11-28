import { v4 as uuidv4 } from "uuid";
import inquirer from "inquirer";
import fs from "fs";
import queryDB from "./queryDB.js";

export default async function addData({info,collection}) {
  try {
    const answer = await inquirer.prompt([
      { type: "input", name: "name", message: "whats your name?" },
      { type: "number", name: "phone", message: "whats your phonenumber?" },
      {
        type: "list",
        name: "age",
        message: "Are an adult ?",
        choices: [
          { name: "Y", value: "Adult" },
          { name: "N", value: "Minor" },
        ],
      },
    ]);
// console.log(info)
    const data = {
      id: uuidv4(),
      name: answer.name,
      phone: answer.phone,
      age: answer.age,
    };

    info.push(data);

    if (fs.existsSync("mycollection")) {
      createDetails({info,collection});
      collection.insertOne(data)
    } else {
      fs.appendFile("mycollection", "[]", (err) => {
        if (err) {
          console.log("db.json file not created", err);
          return;
        }
        createDetails({info,collection});
         collection.insertOne(data)
      });
    }
  } catch (error) {
    console.log("Somethingwent wrong", error);
  }
}
async function createDetails({info,collection}) {
  await fs.writeFile("db.json", JSON.stringify(info), function (err) {
    if (err) {
      console.log(err);
    }
    console.log("saved!");
  });

}
queryDB(addData);

