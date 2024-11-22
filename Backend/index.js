import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRouter from "../Backend/routes/todo.route.js";
import userRouter from "../Backend/routes/user.routes.js";
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 4002;
const DB_URI=process.env.mongodb_uri;

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"], // Add other headers you want to allow here.
  })
);


try {
    await mongoose.connect(DB_URI);
    console.log('database connected');
} catch (error) {
    console.log(Error);
}

app.use("/todo",todoRouter);
app.use("/user",userRouter);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})