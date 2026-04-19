# Koro site

A small marketing website (home, work, contact, and an interactive “graveyard” section) built with web technologies. You do **not** need to understand how it is built to **run** it on your computer—follow the steps below.

**Design reference:** [Home Page Unblur Animation (Figma)](https://www.figma.com/design/G7gAcGvyYTATNih1L4oXwj/Home-Page-Unblur-Animation)

---

## What you need first (one-time setup)

1. **This project folder**  
   Unzip or clone the project so you have it somewhere on your computer (for example your `Documents` folder).

2. **Node.js** (the runtime that runs the project)  
   - Download the **LTS** version from [https://nodejs.org](https://nodejs.org) and install it with the default options.  
   - After installing, you can ignore the details—just know that `npm` (Node’s package manager) comes with it and is used below.

3. **Cursor** (the code editor)  
   Install from [https://cursor.com](https://cursor.com) if you do not have it yet.

---

## How to run the project in Cursor

These steps open the site on your machine so you can click through it in a browser (like testing a preview).

### Step 1 — Open the project

1. Start **Cursor**.
2. Use **File → Open Folder…** (or **Open…**).
3. Select the folder that contains this `README.md` (the project root—not a subfolder inside it).
4. Click **Open**.

### Step 2 — Open the terminal inside Cursor

1. In the menu, choose **Terminal → New Terminal**  
   (or use the shortcut shown in the menu—often **Ctrl + `** on Windows/Linux or **Ctrl + `** / **⌃`** on Mac).

A panel opens at the bottom—that is the **terminal**. Commands you type here run in your project folder.

### Step 3 — Install dependencies (first time, or after a fresh copy)

In the terminal, type exactly:

```bash
npm install
```

Press **Enter** and wait until it finishes without errors. This downloads the libraries the project needs (you only need to do this again if you delete the `node_modules` folder or get a new copy of the project).

### Step 4 — Start the local preview server

In the same terminal, type:

```bash
npm run dev
```

Press **Enter**. After a few seconds you should see a line similar to:

```text
➜  Local:   http://localhost:5173/
```

The number **5173** might be **5174**, **5175**, etc., if another app is already using that port—that is normal.

### Step 5 — Open the site in your browser

1. **Hold Cmd** (Mac) or **Ctrl** (Windows) and **click** the `http://localhost:…` link in the terminal, **or**
2. Copy the address, open **Chrome / Safari / Edge**, paste it into the address bar, and press **Enter**.

You should see the Koro site. While `npm run dev` is running, changes to the code can refresh automatically (hot reload).

### Step 6 — Stop the server

When you are done, click inside the terminal panel and press **Ctrl + C** (Windows/Linux) or **Ctrl + C** (Mac) to stop the preview server.

---

## Using Claude Code or Cursor’s AI (optional)

You do **not** have to use AI to run the project—the terminal steps above are enough.

- **Cursor** has a built-in AI chat/agent. You can ask things like: *“Where do I run npm run dev in this project?”* and it can point you to the terminal and the same commands.
- **Claude Code** (if you use it separately) is another assistant that can walk you through the same steps: installing Node, opening the folder, running `npm install` and `npm run dev`. Tell it you are a beginner and want to **run the dev server** for this folder.

Neither tool replaces installing **Node.js**; they only help explain or repeat these steps.

---

## Other useful commands (optional)

| Command        | What it does                                      |
| -------------- | ------------------------------------------------- |
| `npm run dev`  | Starts the local development site (use this most) |
| `npm run build` | Creates a production-ready folder (`dist/`)      |

---

## If something goes wrong

- **`npm: command not found`**  
  Node.js is not installed or the terminal cannot find it. Reinstall Node from [nodejs.org](https://nodejs.org) and **restart Cursor**, then open a new terminal and try again.

- **Port already in use**  
  The message will mention another port (e.g. `5177`). Use the **Local** URL Vite prints—always the one from your latest `npm run dev` output.

- **Errors during `npm install`**  
  Make sure you opened the **correct folder** (the one with `package.json`). Try deleting the `node_modules` folder and run `npm install` again.

- **Very old Node version**  
  This project expects a **current** Node.js LTS (for example **18** or **20**). If installs fail, update Node from [nodejs.org](https://nodejs.org) and try again.

---

## Project scripts (reference)

- **`npm install`** — Downloads dependencies (run once per fresh copy).
- **`npm run dev`** — Runs the live preview at `http://localhost:…`
- **`npm run build`** — Builds static files for deployment (advanced).

For day-to-day preview work, **`npm run dev`** is what you need.
