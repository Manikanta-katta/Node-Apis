const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const EmployeeRoute = require("./routes/employee");
const AuthenticateRoute = require("./routes/auth");
const Audio = require("./routes/openai")
const Personal = require('./routes/personal')

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

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions))
const PORT = process.env.PORT || 3000;



app.listen(PORT, () => console.log(`Server running...${PORT}`));
app.use("/api/employee", EmployeeRoute);
app.use("/api/employee", AuthenticateRoute);
app.use("/api",Audio),
app.use('/api',Personal)

module.exports = app;
