import mongoose, { Types } from "mongoose";
const mongoSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
    },
    isComplete:{
        type: Boolean,
        required: true,
    }, 
});
const Todo = mongoose.model("todo",mongoSchema);
export default Todo;
