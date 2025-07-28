import type { Note } from "../shared/store";
import { formatDateFromMs } from "../support";
import { useStore } from "../store";
import { displayNoteTitle } from "./note-title";
import { displayEditor } from "./editor";

const store = useStore();

function displayMenu(menu: Note[], element: Element) {
  if (!menu.length) {
    element.innerHTML = `<li class="no-notes">No Notes Yet!</li>`;
    return;
  }

  element.innerHTML = `
    ${menu
      .map(
        (note, index) =>
          `<li class="menu-item" data-id="${index}">
            <div class="menu-title">${note.title}</div>
            <div class="menu-time">${formatDateFromMs(note.lastEditTime)}</div>
          </li>`,
      )
      .join("")}`;

  element.addEventListener("click", async (e: Event) => {
    const lis = Array.from((e.currentTarget as HTMLUListElement).children);
    lis.forEach((li) => {
      li.classList.remove("active");
    });

    const liEl = (e.target as Element).closest("li");
    liEl?.classList.add("active");
    store.setActiveIndex(parseInt(liEl?.dataset.id || "-1"));
    displayNoteTitle(store.activeNode);
    const context = await window.ipcRenderer.readNote(store.activeNode.title);
    displayEditor(context);
  });
}

export { displayMenu };
