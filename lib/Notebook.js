/**
 * @author jrcharney@gmail.com
 * @file: Notebook.js
 * @class Notebook
 * @desc An object that stores a collection of notes.
 * Note: It made sense to reorganize some of the functions. Don't be picky about how there's all this "extra".
 */

import Note from "./Note.js";

export default class Notebook {
    #notes = [];
    /**
     * @method constructor
     * @desc create a new Notebook object. If Notes are give, add them to the Notebook.
     * @param  {...Note} notes 
     */
    constructor(...notes){
        this.#notes = [];
        if(notes.length > 0){
            for(const note of notes){
                if(note instanceof Note){
                    this.#notes.push(note);
                }
            }
        }
    }

    /**
     * @method addNote
     * @desc add a single Note to the Notebook
     * @param {Note} note 
     * @returns 
     */
    addNote(note){
        if(note instanceof Note){
            this.#notes.push(note);
        }
        return this;
    }

    /**
     * @method addNotes
     * @desc add several notes to the notebook
     * @param  {...any} notes 
     * @returns 
     */
    addNotes(...notes){
        for(const note of notes){
            this.addNote(note);
        }
        return this;
    }

    /**
     * @method setNotes
     * @desc set the contents of the Notebook. This will clear out any Notes already in the Notebook.
     * @param  {...Note} notes 
     * @returns 
     */
    setNotes(...notes){
        this.#notes = [];       // clear the notebook
        this.addNotes(notes);
        return this;
    }
    
    /**
     * @method getNotes
     * @desc return an array nof notes.
     * @returns {Array<Note>}
     */
    getNotes(){
        return this.#notes;
    }
    /**
     * @method countNotes
     * @desc Count how many Notes are in the Notebook
     * @returns {Number}
     */
    countNotes(){
        return this.#notes.length;
    }
    /**
     * @method hasNotes
     * @desc indicate if the Notebook has Notes.
     * @returns {Boolean}
     */
    hasNotes(){
        return this.#notes.length > 0;
    }
    /**
     * @method getNote
     * @desc Find a Note in the Notebook by its id. If it doesn't exist, undefined is returned.
     * @param {Number} id 
     * @returns {Note|undefined} 
     */
    getNote(id){
        return this.#notes.find((note) => note.getId() === id);
    }
    /**
     * @method updateNote
     * @desc replace the title and content of a Note if it exists in the Notebook
     * @param {Number} id 
     * @param {String} title 
     * @param {String} content 
     * @returns 
     */
    updateNote(id,title,content){
        const note = this.getNote(id);
        if(note !== undefined){
            note.setTitle(title);
            note.setContent(content);
        }
        return this;
    }
    /**
     * @method updateNoteTitle
     * @desc replace the title of a Note if it exists in the Notebook
     * @param {Number} id 
     * @param {String} title 
     * @returns 
     */
    updateNoteTitle(id,title){
        const note = this.getNote(id);
        if(note !== undefined){
            note.setTitle(title);
        }
        return this;
    }
    /**
     * @method updateNoteContent
     * @desc replace the content in a Note if it exists in the Notebook
     * @param {Number} id 
     * @param {String} content 
     * @returns 
     */
    updateNoteContent(id,content){
        const note = this.getNote(id);
        if(note !== undefined){
            note.setContent(content);
        }
        return this;
    }
    /**
     * @method appendNoteContent
     * @desc append content to a Note if it exists in the Notebook
     * @param {Number} id 
     * @param {String} content 
     * @returns 
     */
    appendNoteContent(id,content){
        const note = this.getNote(id);
        if(note !== undefined){
            note.addContent(content);
        }
        return this;
    }
    /**
     * @method deleteNote
     * @desc delete a note by its id.
     * @param {Number} id 
     * @returns 
     */
    deleteNote(id){
        const note = this.getNote(id);
        if(note !== undefined){
            const index = this.#notes.indexOf(note);    // Find the position of the note.
            this.#notes.splice(index,1);                // Remove it from the notebook
            // TODO: delete note?
        }
        return this;
    }
    /**
     * @method deleteNotes
     * @desc delete multiple notes by their IDs
     * @param  {...Number} ids 
     * @returns 
     */
    deleteNotes(...ids){
        for(const id of ids){
            this.deleteNote(id);
        }
        return this;
    }
    /**
     * @method toJSON
     * @desc write a JSON object that contains the set of notes.
     * @returns {JSON}
     * Note: In my version of this program, the notes are stored in an object that has the key "notes" which is an array that stores all the notes.
     * My intentions were to apply other attributes to the Notebook later.
     */
    toJSON(){
        try{
            if(!this.hasNotes()) throw "This Notebook does not have any Notes to convert to a JSON Object";
            let notebook = {};  // Let's make it an object so we can add other attributes later.
            notebook["notes"] = this.#notes.map((note) => note.toJSON());
            return notebook;
        }catch(err){
            console.error(err);
        }
        // TODO: finally?
    }
    /**
     * @method fromJSON
     * @desc read a JSON object to turn it into a Notebook with Notes
     * @param {JSON} obj 
     * @param {boolean} append Enable this to add notes to a notebook instead of clearing out a notebook's notes.
     * @returns 
     */
    fromJSON(obj,append=false){
        try{
            if(!Object.hasOwn(obj,"notes")) throw "This object does not have a notes attribute.";
            if(obj.notes.length < 1) throw "this object does not have any notes.";
            if(!append){
                this.#notes = [];
            }
            for(const note of obj.notes){
                this.#notes.addNote(new Note().fromJSON(note));
            }
            return this;
        }catch(err){
            console.error(err);
        }
        // TODO: finally?
    }

    /**
     * @method toString
     * @desc Convert notes data object to a String
     * @returns {String}
     * Note: In my version, the JSON object is saved as an object with all the notes stored in an array under the "notes" key.
     */
    toString(){
        return JSON.stringify(this.toJSON(),null,"\t");
    }

    /**
     * @method fromString
     * @desc read the string and parse it into our Notebook full of Notes.
     * @returns
     */
    fromString(str){
        this.fromJSON(JSON.parse(str));     // obviously, the data will be overwritten, so no second argument.
        return this;
    }

    /**
     * @method toList
     * @desc return the items in the notes array as a string of li elements, in case it wasn't done already.
     * @returns {String}
     * Note: No testing will be done with this method at the moment.
     */
    toList(){
        const list = this.#notes.map((note) => note.toListItem()).join("");
        return list;
    }

    /**
     * @method toUnorderedList
     * return the items in the notes array as an unordered list, in case it wasn't done already.
     * @returns {String}
     * Note: No testing will be done with this method at the moment.
     */
    toUnorderedList(){
        return `<ul>${this.toList()}</ul>`
    }
    /*
    getNoteList(){
        const list = this.#notes.map((note) => {
            return `<li><a href="/notes/${note.getId()}">${note.getTitle()}</a></li>`;
        }).join("\n");
        return `<ul>${list}</ul>`
    }
    */
}