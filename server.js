import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from 'cors';

const app = express();

import mongoose from "mongoose";

import fieldRouter from './routers/fieldRouter.js'
import formRouter from './routers/formRouter.js'
import formValueRouter from './routers/fieldValueRouter.js'
import projectRouter from './routers/projectRouter.js'
import authRouter from './routers/authRouter.js'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import fileRouter from './routers/fileRouter.js'



app.use(express.json());
app.use(cors());

app.get("/api/", (req, res) => {
  res.send("hello world");
});

app.use("/api", [fieldRouter, formRouter, formValueRouter, projectRouter, authRouter, userRouter, productRouter,fileRouter]);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});


const port = process.env.PORT || 5200;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
