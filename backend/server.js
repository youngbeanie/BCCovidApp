const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const dataRouter = require("./routes/data");
const data2Router = require("./routes/data2");
const lastsevendaysRouter = require("./routes/lastsevendays");
const gendercountRouter = require("./routes/gendercount");
const regionRouter = require("./routes/regions");

app.use("/data", dataRouter);
app.use("/dataArchive", data2Router);
app.use("/lastsevendays", lastsevendaysRouter);
app.use("/gender", gendercountRouter);
app.use("/regions", regionRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
