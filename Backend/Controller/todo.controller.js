import Todo from "../model/todo.model.js";

export const createTodo = async(req, res) =>{
    const todo = new Todo({
        text : req.body.text,
        isComplete:req.body.completed,
    })
    try {
       const newTodo =await todo.save();
       res.status(201).json({message:"Todo created successfully",newTodo}) 
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"error occuring in todo creation"})
    }
    
};

export const getTodo = async(req,res) =>{
    try {
        const todos = await Todo.find();
        res.status(201).json({message:"Todo fetched successfully",todos}) 
     } catch (error) {
         console.log(error);
         res.status(400).json({message:"error occuring in todo fetching"})
     }
};

export const updateTodo = async(req,res) =>{
    try {
        const todo =await Todo.findByIdAndUpdate(req.params.id, req.body,{
            new:true});
        res.status(201).json({message:"Todo updated successfully",todo}) 
     } catch (error) {
         console.log(error);
         res.status(400).json({message:"error occuring in todo updation"})
     }
};

export const deleteTodo = async(req,res) =>{
    try {
        const todo =await Todo.findByIdAndDelete(req.params.id);
        res.status(201).json({message:"Todo deleted successfully"}) 
     } catch (error) {
         console.log(error);
         res.status(400).json({message:"error in todo deletion"})
     }
};

