const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const EmployeeRoute = require("./routes/employee");
mongoose
  .connect(
    "mongodb+srv://manikanta:manikanta@cluster0.taclgus.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("DB Connected .."))
  .catch((err) => console.log(err));

const db = mongoose.connection;

// db.on('error',(err) =>{
//     console.log(err)
// })

// db.once('open',()=>{
//     console.log("Data base connected")
// })

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 2000;

app.listen(PORT, () => console.log(`Server running...${PORT}`));
app.use("/api/employee", EmployeeRoute);

module.exports = app
