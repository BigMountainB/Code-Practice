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

## Option B — Preview it on your own computer

If you have **Node.js** installed (free, from nodejs.org):

```bash
# 1. Get the code (one time)
git clone <this repository URL>
cd Code-Practice
git checkout claude/davis-plumbing-rebuild-p0huf5

# 2. Start a local preview
npm run serve
```

Then open **http://localhost:8080** in your browser. Press `Ctrl+C` to stop.

(There's nothing to install — `npm run serve` uses a tiny built-in server.)

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
