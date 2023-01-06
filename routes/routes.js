/**
 * @file routes/routes.js
 * @author Jason Charney (jrcharney@gmail.com)
 * TODO: MVC. We got the C and the V. What is our M?
 */
import Note from "../lib/Note.js";
import Notebook from "../lib/Notebook.js";  // You know what this is? IT'S A CONTROLLER!
import express from "express";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
// See sandbox/dirname.js for why we defined these variables.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const router = express.Router();
const notes = new Notebook();

async function readNotebook(){
    try{
        const data = await fs.readFile(path.join(__dirname,"../db/db.json"),{"encoding": "utf8" });
        notes.fromString(data);     // Note: parsing is done in the Notebook.
        //console.log(data);
        console.log(`${notes.countNotes()} read from the Notebook`);
    }catch(err){
        console.error(err);
    }
}

async function writeNotebook(){
    try{
        const content = notes.toString();
        await fs.writeFile(path.join(__dirname,"../db/db.json"),content);
        console.log(`${notes.countNotes()} written to the Notebook`);
    }catch(err){
        console.error(err);
    }
}

/*
async function appendNoteBook(){
    try{
        const content = notes.toString();
        await fs.appendFile("/db/db.json", content);
    }catch(err){
        console.error(err);
    }
}
*/

// readNotebook();     // TODO: Move this to app.js?

/* API routes */
/**
 * @route "/api/notes"
 * @RequestMethod GET
 * @desc Read the db.json file and return all saved notes as JSON.
 */
router.get("/api/notes", (req,res) => {
    //readNotebook();     // TODO: Should we use this here?
    res.json(notes.toJSON());
});

/**
 * @route "/api/notes"
 * @RequestMethod POST
 * @desc When submitted, get a new note, add it to the db.json file then return the new note.
 */
router.post("/api/notes", (req,res) => {
    //const note = req.body;
    const note = new Note(req.body.title,req.body.content);  // create a new note
    notes.addNote(note);
    //notes.push(note);   // push it to the notebook
    writeNotebook();
    console.log(`New Note "${note.getTitle()}" (Note # ${note.getId()}) added.`);       // Good news, this was reached. Bad news is that it can't find the /db/db.json file.
});

/**
 * @route "/api/notes/{id}"
 * @RequestMethod GET
 * @PathVariable {Number} id
 * @desc Get a specific note based on its id
 */
router.get("/api/notes/:id", (req,res) => {
    const note = notes.getNote(req.params.id);  // Get the Note from the Notebook
    res.json(note.toJSON());     // return it as JSON    // TODO: should we display it?
});

// TODO: Need a PUT route to update notes.

/**
 * @route "/api/notes/{id}"
 * @RequestMethod DELETE
 * @PathVariable {Number} id
 * @desc Delete a specific note with id
 */
router.delete("/api/notes/:id", (req,res) => {
    res.send(notes.deleteNote(req.params.id));
    writeNotebook();
    console.log(`Note #${req.params.id} deleted.`);
});

/* HTML Routes (VIEWS!) */
// TODO: should these go in routes/views.js?
/**
 * @route "/"
 * @RequestMethod GET
 * @desc Redirect the user to index.html when `/` is accessed. 
 */
router.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"../public/index.html"));
});

/**
 * @route "/notes"
 * @RequestMethod GET
 * @desc Redirect the user to notes.html when /notes is accessed.
 */
router.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname,"../public/notes.html"));
});

/**
 * @route "*"
 * @RequestMethod GET
 * @desc Redirect the user to 404.html when any other path is accessed.
 */
router.get("*", (req,res) => {
    res.sendFile(path.join(__dirname,"../errors/404.html"));
});
