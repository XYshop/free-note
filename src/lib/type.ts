import type { Note } from "../shared";

export type GetNotes = () => Promise<Note[]>;
export type ReadNote = (fileName: string) => Promise<string>;
export type SaveNote = (fileName: string, content: string) => Promise<void>;
export type DeleteNote = (fileName: string) => Promise<void>;
export type CreateNote = () => Promise<void>;
// export type updateNote = (
//   id: string,
//   title: string,
//   content: string,
// ) => Promise<void>;
