const express = require("express");
const app = express();
const mongoDB = require("./db/connect");
require("dotenv").config();
const noteRoute = require("./routes/routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/error-handler");
const cors = require("cors");

//port
const PORT = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());
app.use("/api/v1/notes", noteRoute);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await mongoDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is live at ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
