import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from "../Backend/routes/todo.route.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 4002;
const DB_URI=process.env.mongodb_uri;

try {
    await mongoose.connect(DB_URI);
    console.log('database connected');
} catch (error) {
    console.log(Error);
}

app.use(express.json());
app.use("/todo",router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})