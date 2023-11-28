import inquirer from "inquirer";
import fs from "fs";
import queryDB from "./queryDB.js";
import dbFileCheck from "./dbFileCheck.js";

export default async function updateData(info) {
  dbFileCheck();
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "recordId",
        message: "Enter ID?",
      },
    ]);

    let current;
    await info.forEach((element) => {
      if (element.id == answers.recordId) {
        current = element;

        updateDetails(current, info);
      }
    });
  } catch (error) {
    console.log("some thing went wrong", error);
  }
}
async function updateDetails(current, info,collection) {
  try {
    const updated = await inquirer.prompt([
      {
        type: "input",
        default: current.name,
        name: "name",
        message: "enter updated name",
      },
      {
        type: "number",
        default: current.phone,
        name: "phone",
        message: "enter phone number",
      },
      {
        type: "list",
        default: current.age,
        name: "age",
        message: "whtas your age?",
        choices: [
          { name: "Y", value: "Adult" },
          { name: "N", value: "Minor" },
        ],
      },
    ]);
    console.log(updated);
    current.name = updated.name;
    current.phone = updated.phone;
    current.age = updated.age;

    await fs.writeFile("db.json", JSON.stringify(info), function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("updated");
      }
    });
  } catch (error) {
    console.log("some thing went wrong", error);
  }
}
queryDB(updateData);