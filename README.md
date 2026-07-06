# Shyam Parmar · Portfolio

A data science themed personal portfolio. Static HTML/CSS/JS, no build step, ready for GitHub Pages.

## Structure

```
├── index.html          # page shell, no content lives here
├── css/style.css       # all styling and animations
├── js/data.js          # ★ ALL CONTENT — edit this to update the site
├── js/main.js          # rendering, canvas, charts, easter eggs
└── assets/
    └── Shyam_Parmar_Resume.pdf
```

## Updating the site when your resume changes

Everything renders from `js/data.js`. You should never need to touch HTML or CSS for a content update.

| What changed | Edit in data.js |
|---|---|
| New job / promotion | Add object to top of `experience` array |
| New career metric | Edit `kpis` array (value, suffix, label) |
| New skill | Add `{ name, score }` to the right category in `skills` |
| New project to feature | Add object to `projects.featured` |
| New links / email | `contact` object |
| Updated resume PDF | Replace `assets/Shyam_Parmar_Resume.pdf` (keep the filename) |

Projects also refresh live from the GitHub API: stars and languages update automatically, and any new public repo not in `excludeRepos` gets appended. Set `projects.fetchLive: false` to turn that off.

## Deploy to GitHub Pages

1. Create a repo named `Shyam-Parmar.github.io` (or push to any repo and enable Pages).
2. Push these files to the root of the `main` branch.
3. Repo Settings → Pages → Source: `main` branch, `/ (root)`.
4. Site goes live at `https://shyam-parmar.github.io/` within a minute or two.

## Hidden details

- Five red lights on first load. Lights out and away we go.
- Type `messi`, `thwip`, or `drs` anywhere on the page.
- The scroll bar goes purple if you set a fastest lap.
- Check the browser console.
- Each section is a stage in a forward pass, input layer to output layer, and the background network fires a pulse when you cross into a new one.

## Notes

- Chart.js is loaded from CDN for the radar charts.
- `prefers-reduced-motion` disables the intro, canvas, and reveals.
- Fonts: Sora (display), IBM Plex Sans (body), IBM Plex Mono (data).
