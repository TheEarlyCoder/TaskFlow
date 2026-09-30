import mongoose from "mongoose"

const todoSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Todo = mongoose.model("Todo", todoSchema)