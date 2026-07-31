# How to view the Davis Plumbing website

The website is fully built. These are the ways to actually **see it in a
browser**, from easiest to most technical. A `.md` file (like this one) is just
notes — it doesn't display the site itself.

---

## Option A — Put it online for free (recommended, gives a shareable link)

Any of these free hosts will serve the site at a real URL in a couple of
minutes. The site is plain static files, so **no build step is required** — just
point the host at the repository.

### Cloudflare Pages / Netlify / Vercel (easiest, no command line)
1. Create a free account and choose **"Import / connect a Git repository."**
2. Pick this repo and the branch **`claude/davis-plumbing-rebuild-p0huf5`**.
3. Settings:
   - **Build command:** leave blank (or `npm run build`)
   - **Publish / output directory:** `.` (a single dot — the repo root)
4. Deploy. You'll get a link like `davis-plumbing.pages.dev` you can open and
   share. It updates automatically every time the branch changes.

### GitHub Pages
GitHub can host it too, but a GitHub "project" URL lives at a sub-path
(`/Code-Practice/`), which needs a small base-path tweak to the build. I'm happy
to set that up — just say the word and I'll add the deploy workflow so it
publishes automatically. (When the real `davisplumbing.com` domain is pointed at
it, this tweak isn't needed.)

---

## Option B — Preview it on your own computer  ← you chose this

**Step 1: Install Node.js** (one time, free). Download the "LTS" version from
<https://nodejs.org> and install it with the defaults. This gives you the
`node` and `npm` commands.

**Step 2: Get the website files.** Two ways — pick one:

- **No Git needed (simplest):** On the GitHub repo page, switch the branch
  dropdown to **`claude/davis-plumbing-rebuild-p0huf5`**, click the green
  **Code** button → **Download ZIP**, then unzip it. Open a terminal
  (Command Prompt / PowerShell on Windows, Terminal on Mac) and `cd` into the
  unzipped folder.

- **With Git:**
  ```bash
  git clone https://github.com/BigMountainB/Code-Practice.git
  cd Code-Practice
  git checkout claude/davis-plumbing-rebuild-p0huf5
  ```

**Step 3: Start the preview.** From inside the project folder, run:

```bash
npm run serve
```

You'll see `Serving Davis Plumbing at http://localhost:8080`.

**Step 4:** Open **http://localhost:8080** in your browser. That's the whole
site — click around every page. Press `Ctrl+C` in the terminal to stop it.

> There is **nothing to install** beyond Node itself — no `npm install`, no
> dependencies, no waiting. The preview uses a tiny built-in server, and the
> pages are already built and included.
>
> If you ever edit content in `src/`, run `npm run build` first to regenerate
> the pages, then `npm run serve` again. To do both at once: `npm run dev`.

### Windows note
The commands are identical in PowerShell or Command Prompt. If `npm` isn't
recognized, close and reopen the terminal after installing Node so it picks up
the new command.

---

## Option C — Just look at the built files

Every page is a normal `.html` file already generated in the repo:
`index.html` (home), `about/index.html`, `gallery/index.html`, and so on.
Opening `index.html` directly by double-clicking mostly works, but some
links/assets expect a real address starting with `/`, so **Option A or B looks
correct**; double-clicking can show broken styling.

---

## Which should you choose?

- **You want a link to click and share right now** → Option A (Cloudflare
  Pages / Netlify). Tell me and I can walk you through it, or set up GitHub
  Pages for you.
- **You just want to peek locally** → Option B.
- **Going live for real** → we'll point `davisplumbing.com` at Option A and
  it serves at the root with no changes.
