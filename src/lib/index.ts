import { homedir } from "os";
import { readdir, stat, readFile, writeFile, unlink, mkdir } from "fs/promises";
import { existsSync } from "fs";
import type { Note } from "../shared";
import type {
  GetNotes,
  ReadNote,
  SaveNote,
  DeleteNote,
  CreateNote,
} from "./type";
import { dialog } from "electron";
import path from "path";

export const getRootDir = () => {
  const dir = `${homedir()}/NoteMark`;
  if (!existsSync(dir)) {
    mkdir(dir, { recursive: true });
  }
  return dir;
};

export const getNotes: GetNotes = async (): Promise<Note[]> => {
  const rootDir = getRootDir();
  const filesNames = await readdir(rootDir);
  const notes = filesNames.filter((file) => file.endsWith(".md"));
  return Promise.all(notes.map(getNoteInfoFormName));
};

export const getNoteInfoFormName = async (fileName: string): Promise<Note> => {
  const stats = await stat(`${getRootDir()}/${fileName}`);
  const content = await readFile(`${getRootDir()}/${fileName}`, "utf-8");

  return {
    title: fileName.replace("./\.md", ""),
    lastEditTime: stats.mtimeMs,
    content,
  };
};

export const readNote: ReadNote = async (fileName: string): Promise<string> => {
  return readFile(`${getRootDir()}/${fileName}`, "utf-8");
};

export const saveNote: SaveNote = async (
  fileName: string,
  content: string,
): Promise<void> => {
  await writeFile(`${getRootDir()}/${fileName}`, content);
};

export const createNote: CreateNote = async (): Promise<void> => {
  const rootDir = getRootDir();
  const { filePath, canceled } = await dialog.showSaveDialog({
    title: "new Note",
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: "Create",
    properties: ["showOverwriteConfirmation"],
    showsTagField: false,
    filters: [{ name: "Markdown", extensions: ["md"] }],
  });

  if (canceled || !filePath) {
    console.log("Note creation canceled");
    return;
  }

  if (!existsSync(filePath)) {
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, "");
  }
};

export const deleteNote: DeleteNote = async (
  fileName: string,
): Promise<void> => {
  await unlink(`${getRootDir()}/${fileName}`);
};
