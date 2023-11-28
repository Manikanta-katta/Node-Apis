const Express = require("express");
const connection = require("./database");
const app = Express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Data base connected");
  });
});