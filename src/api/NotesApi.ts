import { APIRequestContext } from "@playwright/test";
import { Token } from "./token";

export class NotesApi {
    constructor(private request: APIRequestContext) { }

    private baseUrl = "https://practice.expandtesting.com/notes/api";


    async createNote(title: string, description: string, category: string) {
        return await this.request.post(`${this.baseUrl}/notes`, {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": await new Token().generateToken()
            },
            data: { title, description, category }
        });
    }

    async getNote(id: string) {
        return await this.request.get(`${this.baseUrl}/notes/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": await new Token().generateToken()
            },
        });
    }

    async getAllNotes() {
        return await this.request.get(`${this.baseUrl}/notes`, {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": await new Token().generateToken()
            },
        });
    }

    async updateNote(id: string, title: string, description: string, category: string) {
        return await this.request.put(`${this.baseUrl}/notes/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": await new Token().generateToken()
            },
            data: { title, description, category }
        });
    }

    async deleteNote(id: string) {
        return await this.request.delete(`${this.baseUrl}/notes/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": await new Token().generateToken()
            },
        });
    }
}
