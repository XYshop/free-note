import { Note } from "../shared";
import { getElement } from "../support";

const displayNoteTitle = (note: Note) => {
  const el = getElement("#note-title");
  if (el) {
    el.textContent = note.title;
  }
};

export { displayNoteTitle };
