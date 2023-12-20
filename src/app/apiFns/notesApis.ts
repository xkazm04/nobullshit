import axios from "axios";

export type NoteCreate = {
    habitId: string;
    created: string;
    text: string;
    ai: boolean;
}

type NoteUpdate = {
    id: string;
    text: string;
}

const notesApi = axios.create({
    baseURL: "http://localhost:8000/habit/notes"
    });

export async function getNotes (habitId: string) {
    const response = await notesApi.get('/habit/' + habitId);
    return response.data;
  }

export async function noteCreate (note: NoteCreate) {
    const response = await notesApi.post('/', note);
    return response.data;
  }

export async function noteUpdate (note: NoteUpdate) {
    const response = await notesApi.put('/' + note.id, note);
    return response.data;
  }

export async function deleteNote (noteId: string) {
    const response = await notesApi.delete('/' + noteId);
    return response.data;
  }


