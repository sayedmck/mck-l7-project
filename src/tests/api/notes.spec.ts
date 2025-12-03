import { test, expect } from "@playwright/test";
import { NotesApi } from "../../api/NotesApi";
import { validateSchema } from "../../utils/schemaValidator";

import createNoteSchema from "../../schemas/createNote.response.schema.json";
import getNoteSchema from "../../schemas/getNote.response.schema.json";
import updateNoteSchema from "../../schemas/updateNote.response.schema.json";
import deleteNoteSchema from "../../schemas/deleteNote.response.schema.json";

test.describe("Notes API CRUD Suite with X-API-KEY", () => {

    test("Create Note - Validate Status, Response & Schema", async ({ request }) => {
        const api = new NotesApi(request);
        const res = await api.createNote("Playwright Note", "This is a valid test description", "Home");

        expect(res.status()).toBe(200);

        const body = await res.json();
        expect(body.message).toBe("Note successfully created");

        const schemaCheck = validateSchema(createNoteSchema, body);
        expect(schemaCheck.valid, JSON.stringify(schemaCheck.errors)).toBe(true);
    });

    test("Retrieve Single Note - Validate data correctness", async ({ request }) => {
        const api = new NotesApi(request);

        const create = await api.createNote("My Valid Note", "This is at least ten characters", "Home");
        const createdId = (await create.json()).data.id;

        const res = await api.getNote(createdId);
        expect(res.status()).toBe(200);

        const body = await res.json();
        expect(body.data.id).toBe(createdId);
        expect(body.data.title).toBe("My Valid Note");

        const schemaCheck = validateSchema(getNoteSchema, body);
        expect(schemaCheck.valid, JSON.stringify(schemaCheck.errors)).toBe(true);
    });

    test("Retrieve All Notes - Validate list and length", async ({ request }) => {
        const api = new NotesApi(request);

        const res = await api.getAllNotes();
        expect(res.status()).toBe(200);

        const body = await res.json();
        expect(Array.isArray(body.data)).toBe(true);
        expect(body.data.length).toBeGreaterThan(0);
    });

    test("Update Note - Validate changes and schema", async ({ request }) => {
        const api = new NotesApi(request);

        const create = await api.createNote("Updated Valid Title", "Updated valid description text", "Home");
        const id = (await create.json()).data.id;

        const res = await api.updateNote(id, "Updated Title", "Updated Description", "Home");
        expect(res.status()).toBe(200);

        const body = await res.json();
        expect(body.data.title).toBe("Updated Title");

        const schemaCheck = validateSchema(updateNoteSchema, body);
        expect(schemaCheck.valid).toBe(true);
    });

    test("Delete Note - Validate deletion and negative scenario", async ({ request }) => {
        const api = new NotesApi(request);

        const create = await api.createNote("Valid Delete Title", "Description long enough to pass validation", "Home");
        const id = (await create.json()).data.id;

        const res = await api.deleteNote(id);
        expect(res.status()).toBe(200);

        const body = await res.json();
        expect(body.message).toBe("Note successfully deleted");

        const schemaCheck = validateSchema(deleteNoteSchema, body);
        expect(schemaCheck.valid).toBe(true);

        // Negative test: deleting again should return 404
        const deleteAgain = await api.deleteNote(id);
        expect(deleteAgain.status()).toBe(404);
    });

    test("Boundary Case - Empty title returns 400", async ({ request }) => {
        const api = new NotesApi(request);

        const res = await api.createNote("", "desc", "Home");
        expect(res.status()).toBe(400);

        const body = await res.json();
        expect(body.message).toContain("Title must be between 4 and 100 characters");
    });

});
