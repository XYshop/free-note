/// <reference types="vite-plugin-electron/electron-env" />

import type {
  GetNotes,
  ReadNote,
  SaveNote,
  CreateNote,
  DeleteNote,
} from "../src/lib/type";

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    APP_ROOT: string;
    /** /dist/ or /public/ */
    VITE_PUBLIC: string;
  }
}

// Used in Renderer process, expose in `preload.ts`

declare global {
  interface Window {
    ipcRenderer: {
      on: (typeof import("electron"))["ipcRenderer"]["on"];
      off: (typeof import("electron"))["ipcRenderer"]["off"];
      send: (typeof import("electron"))["ipcRenderer"]["send"];
      invoke: (typeof import("electron"))["ipcRenderer"]["invoke"];
      getNotes: GetNotes;
      readNote: ReadNote;
      saveNote: SaveNote;
      createNote: CreateNote;
      deleteNote: DeleteNote;
    };
  }
}
