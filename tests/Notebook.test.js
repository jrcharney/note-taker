/**
 * @author Jason Charney (jrcharney@gmail.com)
 * @file tests/Note.test.js
 * @desc Unit testing for the Notebook class
 */
import {describe, it, expect} from "@jest/globals";
import Notebook from "../lib/Notebook.js";
import Note from "../lib/Note.js";

describe("NoteBook",() => {
    const records = {
        "notes": [
            {
                "id"      : 1,
                "title"   : "HW4 Code Quiz",
                "content" : "Did not finish it."
            },
            {
                "id"      : 2,
                "title"   : "HW5 Work Day Scheduler",
                "content" : "Did not finish it."
            },
            {
                "id"      : 3,
                "title"   : "HW 10 Team Profile Generator",
                "content" : "Inquirer malfunction."
            }
        ]
    };
    const note0 = new Note(records.notes[0].title,records.notes[0].content);
    const note1 = new Note(records.notes[1].title,records.notes[1].content);
    const note2 = new Note(records.notes[2].title,records.notes[2].content);
    const notes = [note0,note1,note2];
    /*
    const notes = [
        {
            "id": 1,
            ...note0
        },
        {
            "id": 2,
            ...note1
        },
        {
            "id": 3,
            ...note2
        }
    ];
    */
    const collection = new Notebook(note0,note1,note2);

    describe("getNotes",() => {
        it("should return an array of notes", () => {
            expect(collection.getNotes()).toStrictEqual(notes);
        })
    });
    describe("countNotes",() => {
        it("should expect the number of notes in the array",() => {
            expect(collection.countNotes()).toBe(3);
        })
    });
    describe("hasNotes",() => {
        it("should return true if the notebook has notes", () => {
            expect(collection.hasNotes()).toBe(true);
        })
    });
    describe("getNote",() => {
        it("should return the note that has an ID of 1", () => {
            expect(collection.getNote(1)).toBe(note0);
        })
    });
    describe("toJSON",() => {
        it("should return the notes as a JSON object",() => {
            expect(collection.toJSON()).toStrictEqual(records);
        })
    });
    describe("toString",() => {
        it("should return the notes as a string",() => {
            expect(collection.toString()).toStrictEqual(JSON.stringify(records,null,"\t"));
        })
    })
});