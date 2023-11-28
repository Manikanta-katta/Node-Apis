const bodyParser = require("body-parser");
const Express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const UserDetails = require("./router/userrouter");
const app = Express();
const cron = require("./cron");

mongoose
  .connect("mongodb://127.0.0.1:27017/cron", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected .."))
  .catch((err) => console.log(err));

const db = mongoose.connection;

cron.sendMailAllUser();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Port is running on 8080 ....."));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/cron", UserDetails);
module.exports = app;
