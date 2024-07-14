import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connection.js";
import router from "./router/route.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); // less hacker know about our stacl

const port = 8000;

app.get("/", (req, res) => {
  res.status(201).json("home get response");
});

//api routes
app.use("/api", router);

//start only when we have a valid connection
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((err) => {
    console.log("Invalid Database Connection...");
  });
