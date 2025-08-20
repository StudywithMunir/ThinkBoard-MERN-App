import mongoose from "mongoose";

// 1. create Schema
// 2. create model based of that Schema

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {timestamps: true} //if you add this line mongodb by default gives you createdAt and updatedAt field
);

const Note = mongoose.model("Note",noteSchema);

export default Note;