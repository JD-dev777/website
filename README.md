# BotFlow Discord Bot Website

This project contains a clean, modern website for configuring a Discord bot. It includes:

- A hero section and product-style landing page
- A settings form for bot configuration
- A live JSON preview panel
- Export and copy actions for the config
- Local persistence with browser storage

## Run locally

Open `index.html` in a browser, or serve the folder with a static server:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Files

- `index.html` – page structure
- `styles.css` – styling and responsive layout
- `script.js` – dynamic config logic and preview behavior
