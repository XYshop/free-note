import { Note, Store } from "../shared/store";
import type { Editor } from "@tiptap/core";

const store: Store = {
  activeIndex: -1,
  notes: [],
  editor: null,
};

const useStore = () => {
  return {
    data: store,
    // Getter
    get activeNode() {
      return store.notes[store.activeIndex];
    },
    get editor() {
      return store.editor;
    },

    // Setter
    setNotes(notes: Note[]) {
      store.notes = notes;
    },
    setActiveIndex(index: number) {
      store.activeIndex = index;
    },
    setEditor(editor: Editor) {
      store.editor = editor;
    },
    resetEditor(content: string) {
      store.editor?.commands.setContent(content);
    },
  };
};

export { useStore };
