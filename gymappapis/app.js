const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/errorHandler");
require("./database/connection");

const app = express();

const usersRouter = require("./routes/userRoutes");

app.use(bodyParser.json());
app.use(express.json());
app.use(errorHandler);

// define routes
app.use("/api/v1/users", usersRouter);

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
