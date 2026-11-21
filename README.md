# DF Exposure website

## Put it online (GitHub Pages)
Upload every file in this folder to the top level of your repository, then Settings > Pages > Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
Delete these old files from the repository if they are still there: `portfolio.html`, `work.json`, and the `media` folder.

## Your details
- `script.js` (top): set `EMAIL` and `FORMSPREE_URL` (free form link from formspree.io).
- `index.html`, `work.html`, `query.html`, `privacy.html`: replace `YOUR_INSTAGRAM` with your Instagram handle.
- `privacy.html`: replace [YOUR FULL NAME].

## Adding a new box to the My Work page
1. In GitHub, open `work.html` and click the pencil icon (Edit).
2. Find the comment "HOW TO ADD A NEW BOX". Copy one whole box, from `<article class="work-card">` to `</article>`.
3. Paste it directly after the last `</article>` (or at the top of the list to make it appear first).
4. Change the tag, the title and the description, and replace the link in `href="..."` with your Instagram video link.
5. Click "Commit changes". The site updates in about a minute.

To remove a box, delete everything from its `<article` to its `</article>`.
