require("dotenv").config();
const express = require("express"); //commonjs
const configViewEngine = require("../src/configs/viewEngine");
const cors = require("cors");

// import connection to database
const connection = require("../src/configs/database");

const app = express();
const port = process.env.PORT || 8888;

// enable cors middleware for cross-origin request
app.use(cors());

//config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

//config template engine
configViewEngine(app);

(async () => {
  try {
    //using mongoose
    await connection();

    app.listen(port, () => {
      console.log(`Backend Nodejs App listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error connect to DB: ", error);
  }
})();
