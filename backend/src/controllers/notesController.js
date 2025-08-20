import Note from "../models/Note.js";

export async function getAllNotes(req,res){
    try {
        const notes = await Note.find().sort({createdAt:-1}); //sorting in desc according to createdAt field
        res.status(200).json(notes);        
    } catch (error) {
        console.error("Error occured",error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function getNoteById(req,res) {
    try {
        const id = req.params.id;
        const note = await Note.findById(id);
        if(!note) return res.status(404).json({message: "Note not found"});
        res.json(note);
    } catch (error) {
        console.error("Error occured",error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function createNote(req,res){
    try {
        // destructing title,content from req.body(form)
        const {title,content} = req.body;
        const note = new Note({title: title, content: content});
        // saving the new Note
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error occured",error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function updateNote(req,res){
    try {
        // destructing form input
        const {title,content} = req.body;
        const id = req.params.id;
        // first parameter is the id which is associated to that note
        // second parameter are the fields which we want to update
        // third parameter is optional (it just returns updated field)
        const updatedNote = await Note.findByIdAndUpdate(id,{title,content}, {new:true});
        // on invalid note value
        if(!updatedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error occured",error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function deleteNote(req,res){
    try {
        const id = req.params.id;
        const deletedNote = await Note.findByIdAndDelete(id);
        if(!deletedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json({message:"Note deleted successfully"});
    } catch (error) {
        console.error("Error occured",error);
        res.status(500).json({message: "Internal Server Error"});
    }
}