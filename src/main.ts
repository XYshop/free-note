import "./style.css";
import AddNoteLogo from "/note.png";
import TrashLogo from "/trash.png";
import { useStore } from "./store";
import { displayMenu, displayNoteTitle } from "./components";
import { getElement } from "./support";

const store = useStore();

// <input id="search" type="text" placeholder="Search" />

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="layout">
    <aside class="menu">
      <div class="search-box">
        <div id="add"><img src="${AddNoteLogo}" /></div>
        <p>FILES</p>
        <div id="trash"><img src="${TrashLogo}" /></div>
      </div>
      <ul id="menu"></ul>
    </aside>
    <main class="context">
      <div id="note-title"></div>
      <div id="editor"></div>
    </main>
  </div>
`;

document.addEventListener("DOMContentLoaded", async () => {
  await init();

  getElement("#add")?.addEventListener("click", async () => {
    await window.ipcRenderer.createNote();
    await init();
  });

  getElement("#trash")?.addEventListener("click", async () => {
    await window.ipcRenderer.deleteNote(store.activeNode.title);
    await init();
  });

  // getElement("#search")?.addEventListener("input", (e: Event) => {
  //   const text = (e.target as HTMLInputElement).value;
  //   const menuList = text
  //     ? store.data.notes.filter((mi) => mi.title.includes(text))
  //     : store.data.notes;
  //   displayMenu(menuList, getElement("#menu"));
  // });
});

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});

async function init() {
  const notes = await window.ipcRenderer.getNotes();
  store.setNotes(notes);

  displayMenu(notes, getElement("#menu"));

  if (store.data.activeIndex !== -1) {
    displayNoteTitle(store.activeNode);
  }
}
