import express from "express";
import {  getAllNotes,createNote,updateNote, deleteNote, getNoteById  } from "../controllers/notesController.js";

const router = express.Router();

// Note: prefix is /api/notes which is in server.js

// first parameter is endpoint (/,/:id) with prefix(/api/notes)
// second parameter is the callback function which we defined inside controller and just called here
router.get("/",getAllNotes);
router.get("/:id",getNoteById);
router.post("/",createNote);
router.put("/:id",updateNote);
router.delete("/:id",deleteNote);

export default router;