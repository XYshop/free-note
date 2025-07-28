import { ipcRenderer, contextBridge } from "electron";
import type {
  GetNotes,
  ReadNote,
  SaveNote,
  CreateNote,
  DeleteNote,
} from "../src/lib/type";

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) =>
      listener(event, ...args),
    );
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },

  // You can expose other APTs you need here.
  // ...
  getNotes(...args: Parameters<GetNotes>) {
    return ipcRenderer.invoke("getNotes", ...args);
  },
  readNote(...args: Parameters<ReadNote>) {
    return ipcRenderer.invoke("readNote", ...args);
  },
  saveNote(...args: Parameters<SaveNote>) {
    return ipcRenderer.invoke("saveNote", ...args);
  },
  createNote(...args: Parameters<CreateNote>) {
    return ipcRenderer.invoke("createNote", ...args);
  },
  deleteNote(...args: Parameters<DeleteNote>) {
    return ipcRenderer.invoke("deleteNote", ...args);
  },
});
