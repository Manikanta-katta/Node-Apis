import axios from "axios";
import { error } from "console";
import fs from "fs";
import queryDB from "./queryDB.js";

export default async function imageDownload() {
  const imageUrl = "https://developer.okta.com/assets-jekyll/blog/command-line-apps-with-nodejs/command-line-apps-with-nodejs-c5705c042369b3ba611a7d7f3d5a3c8c207fbced64b74c74600ba4f0d1a7b015.jpg";
  const outputPath = "./downloads/image.png";

 await axios
    .get(imageUrl, { responseType: "stream" })
    .then((response) => {
      response.data
        .pipe(fs.createWriteStream(outputPath))
        .on("finish", () => {
          console.log("Image Downloaded succcessfully");
        })
        .on("error", () => {
          console.log("error downloading the file");
        });
    })
    .catch((err) => {
      console.log("An error occured while fetching the image url");
    });
}
queryDB(imageDownload);