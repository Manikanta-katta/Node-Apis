const express = require('express');
const app = express();
const mongoose = require("mongoose");


const dbName ='node-practice'
 mongoose
  .connect(
    "mongodb+srv://manikanta:manikanta@cluster0.taclgus.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  ).then(() => console.log("DB Connected .."))
  .catch((err) => console.log(err));

  const client  = mongoose.connection;

  const db = client.db(dbName)

  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running...${PORT}`));