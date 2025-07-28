import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { marked } from "marked";
import { getElement } from "../support";
import { useStore } from "../store";

const store = useStore();

const displayEditor = (content: string) => {
  if (store.editor) {
    store.resetEditor(marked(content) as string);
  } else {
    store.data.editor = new Editor({
      element: getElement("#editor"),
      extensions: [StarterKit],
      content: marked(content),
      autofocus: true,
      editable: true,
      async onUpdate({ editor }) {
        const html = editor.getHTML();
        window.ipcRenderer.saveNote(
          store.activeNode.title,
          await marked.parse(html),
        );
      },
    });
  }
};

export { displayEditor };
