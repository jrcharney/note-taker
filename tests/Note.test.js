/**
 * @author Jason Charney (jrcharney@gmail.com)
 * @file tests/Note.test.js
 * @desc Unit testing for the Note class
 */
import {describe, it, expect} from "@jest/globals";
import Note from "../lib/Note.js";

describe("Note", () => {
    const record = {
        "id"      : 1,
        "title"   : "Fix these",
        "content" : "-[ ] HW4: code-quiz\n-[ ] HW5: work-day-scheduler\n-[ ] HW10: team-profile-generator"
    }
    const note = new Note(record.title,record.content);

    describe("getId",() => {
        it("should return a note ID of 1.",() => {
            expect(note.getId()).toBe(record.id);
        })
    });
    describe("getTitle",() => {
        it("should return the note title",() => {
            expect(note.getTitle()).toBe(record.title);
        })
    });
    describe("getContent",() => {
        it("should return the note content",() => {
            expect(note.getContent()).toBe(record.content);
        })
    });
    describe("toJSON",() => {
        it("should return the note",() => {
            expect(note.toJSON()).toStrictEqual(record);
        })
    });

    describe("toString",() => {
        it("should return the note as a stringified JSON",() => {
            expect(note.toString()).toStrictEqual(JSON.stringify(record,null,"\t"));
        })
    });
});