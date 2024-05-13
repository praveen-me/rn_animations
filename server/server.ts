import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import movieRouter from "./src/routers/movies";

const app = express();
app.use(bodyParser.json());

app.use(morgan("dev"));

app.use(
  cors({
    origin: ["*"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api", movieRouter);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
