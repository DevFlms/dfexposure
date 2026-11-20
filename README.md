# DF Exposure website

## 1. Put it online (free, GitHub Pages)
1. Create a GitHub account, then a new **public** repository (e.g. `dfexposure`).
2. Upload everything in this folder (Add file > Upload files).
3. Settings > Pages > Source: "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
4. Your site appears at `https://YOUR-USERNAME.github.io/dfexposure/` after a minute.

Only people you add as collaborators on the repository can change the site, so only you can add work.

## 2. Edit your details
- `script.js` (top): set `EMAIL` and `FORMSPREE_URL`.
- `index.html`, `portfolio.html`, `query.html`: replace `YOUR_INSTAGRAM` with your Instagram handle. Edit the About text in `index.html`.

## 3. Add work
1. Upload the photo or video file into the `media/` folder (keep photos under ~500 KB and videos small; for long videos use YouTube instead).
2. Open `work.json` and add an entry. Example:

```json
[
  { "title": "Sunset session", "type": "photo", "src": "media/sunset.jpg", "featured": true },
  { "title": "Wedding highlights", "type": "video", "src": "media/wedding.mp4", "poster": "media/wedding.jpg", "featured": true },
  { "title": "Brand film", "type": "video", "youtube": "VIDEO_ID_FROM_URL", "featured": false }
]
```
- `featured: true` shows it in "My Work" on the home page (first 6). All items appear in the full portfolio.
- Newest first: put new entries at the top of the list. Watch the commas between entries.

## 4. Make the query form send to your email
1. Sign up free at formspree.io, create a form, copy its URL (looks like `https://formspree.io/f/abcdwxyz`).
2. Paste it into `FORMSPREE_URL` in `script.js`.
Until then, the form opens the visitor's email app with the message pre-filled.
