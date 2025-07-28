import type { Editor } from "@tiptap/core";

interface Note {
  title: string;
  lastEditTime: number;
  content: string;
}

interface Store {
  activeIndex: number;
  notes: Note[];
  editor: null | Editor;
}

type useStore = () => Store;

export type { Note, Store, useStore };
