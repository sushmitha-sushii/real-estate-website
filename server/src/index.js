import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { propertyRouter } from "./routes/property.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/property", propertyRouter);

mongoose.connect(
  "mongodb+srv://sushmitha:JaiShreeRam01@realestate.tsbvzjz.mongodb.net/RealEstate?retryWrites=true&w=majority&appName=RealEstate",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(3001, () => console.log("Server started"));

