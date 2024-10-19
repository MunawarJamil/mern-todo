import express from "express";
import dotenv from "dotenv";
import { db_connection } from "./config/db.js";
import Router from "./routes/product.route.js";
const app = express();
dotenv.config();
app.use(express.json());
//first controller route to display root route
app.get("/", (req, res) => {
  res.send("server is ready");
});

//get all products
app.use("/api/products", Router);

db_connection();
app.listen(process.env.PORT, () => {
  console.log("app is listening on 3000");
});
