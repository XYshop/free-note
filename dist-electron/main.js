import { dialog as v, app as s, BrowserWindow as l, ipcMain as r } from "electron";
import { fileURLToPath as N } from "node:url";
import n from "node:path";
import { homedir as R } from "os";
import { readdir as E, readFile as d, writeFile as m, mkdir as p, unlink as P, stat as g } from "fs/promises";
import { existsSync as f } from "fs";
import T from "path";
const i = () => {
  const e = `${R()}/NoteMark`;
  return f(e) || p(e, { recursive: !0 }), e;
}, $ = async () => {
  const e = i(), a = (await E(e)).filter((_) => _.endsWith(".md"));
  return Promise.all(a.map(I));
}, I = async (e) => {
  const t = await g(`${i()}/${e}`), a = await d(`${i()}/${e}`, "utf-8");
  return {
    title: e.replace("./.md", ""),
    lastEditTime: t.mtimeMs,
    content: a
  };
}, y = async (e) => d(`${i()}/${e}`, "utf-8"), D = async (e, t) => {
  await m(`${i()}/${e}`, t);
}, O = async () => {
  const e = i(), { filePath: t, canceled: a } = await v.showSaveDialog({
    title: "new Note",
    defaultPath: `${e}/Untitled.md`,
    buttonLabel: "Create",
    properties: ["showOverwriteConfirmation"],
    showsTagField: !1,
    filters: [{ name: "Markdown", extensions: ["md"] }]
  });
  if (a || !t) {
    console.log("Note creation canceled");
    return;
  }
  f(t) || (await p(T.dirname(t), { recursive: !0 }), await m(t, ""));
}, S = async (e) => {
  await P(`${i()}/${e}`);
}, w = n.dirname(N(import.meta.url));
process.env.APP_ROOT = n.join(w, "..");
const c = process.env.VITE_DEV_SERVER_URL, C = n.join(process.env.APP_ROOT, "dist-electron"), u = n.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = c ? n.join(process.env.APP_ROOT, "public") : u;
let o;
function h() {
  o = new l({
    icon: n.join(process.env.VITE_PUBLIC, "logo.png"),
    autoHideMenuBar: !0,
    vibrancy: "under-window",
    visualEffectState: "active",
    titleBarStyle: "hidden",
    webPreferences: {
      preload: n.join(w, "preload.mjs"),
      sandbox: !0,
      contextIsolation: !0
    }
  }), o.webContents.on("did-finish-load", () => {
    o == null || o.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), c ? o.loadURL(c) : o.loadFile(n.join(u, "index.html")), r.handle(
    "getNotes",
    (e, ...t) => $(...t)
  ), r.handle(
    "readNote",
    (e, ...t) => y(...t)
  ), r.handle(
    "saveNote",
    (e, ...t) => D(...t)
  ), r.handle(
    "createNote",
    (e, ...t) => O(...t)
  ), r.handle(
    "deleteNote",
    (e, ...t) => S(...t)
  );
}
s.on("window-all-closed", () => {
  process.platform !== "darwin" && (s.quit(), o = null);
});
s.on("activate", () => {
  l.getAllWindows().length === 0 && h();
});
s.whenReady().then(h);
export {
  C as MAIN_DIST,
  u as RENDERER_DIST,
  c as VITE_DEV_SERVER_URL
};
