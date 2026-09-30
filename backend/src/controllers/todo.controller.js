import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import {Todo} from "../models/todo.models.js";

const createTodo = asyncHandler(async (req, res) => {
  const { content } = req.body;
  if (!content?.trim()) {
    throw new ApiError(400, "Content must be provided");
  }
  const todo = await Todo.create({
    content: content,
    owner: req.user._id,
  });
  return res.status(201).json({
    success: true,
    message: "New Todo Created Successfully",
    todo,
  });
});

const getAllTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ owner: req.user._id });
  return res.status(200).json({
    success: true,
    message: "All todos fetched successfully",
    todos,
  });
});

const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content, isCompleted } = req.body;
  if (content === undefined && isCompleted === undefined)
    throw new ApiError(400, "Atleast one field must be provided");
  const updateFields = {};

  if (content !== undefined) {
    if (!content.trim()) {
      throw new ApiError(400, "Content cannot be empty");
    }
    updateFields.content = content;
  }
  if(isCompleted !== undefined) {
    updateFields.isCompleted = isCompleted
  }

  const todo = await Todo.findOneAndUpdate(
    { 
        _id: id, 
        owner: req.user._id 
    },
    updateFields,
    { new: true },
  );
  if (!todo) throw new ApiError(404, "Todo not found");
  return res
  .status(200)
  .json(
    {
        success: true,
        message: "Todo updated successfully",
        todo
    }
  )
});

const deleteTodo = asyncHandler(async(req, res)=> {
    const {id} = req.params
    const todo = await Todo.findOneAndDelete(
        {
            _id: id,
            owner: req.user._id
        }
    )
    if(!todo) {
        throw new ApiError(404, "Todo not found!")
    }
    return res
    .status(200)
    .json(
        {
            success: true,
            message: "Todo deleted successfully",
            todo
        }
    )
})

export {
    createTodo,
    getAllTodos,
    updateTodo,
    deleteTodo
}