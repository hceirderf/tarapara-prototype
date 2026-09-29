# TaraPara! · Clickable prototype

> *Alam mo kung saan sasakay. Alam mo kung saan bababa.*

A high-fidelity, clickable front-end prototype of **TaraPara!**, a public transport guide for first-time commuters in Pasay, Makati, Taguig, Pasig and Parañaque. It was built for a live demo during the 15-minute business pitch, and it runs offline on a laptop or phone.

**Prototype · illustrative data.** Every route, fare, time, operator, comment and number in this prototype is an example. Nothing is real-time.

## What's inside

| File | What it holds |
|---|---|
| `index.html` | Page shell: desktop stage, phone frame, demo panel |
| `styles.css` | All styling (brand colors, phone frame, map, sheets, pages) |
| `data.js` | Map geometry, 12 hubs, 17 routes (incl. 3 TODA zones and 2 P2P partner routes), 3 planned trips, comments, operator data |
| `app.js` | App logic: schematic SVG map, screens, sheets, demo helpers |
| `README.md` | This file |

The app uses plain HTML, CSS and JavaScript. There are no frameworks, build step, external requests, web fonts or API keys. Scripts load with classic `<script>` tags, so the page works from `file://`.

### Screens

1. **Welcome**: logo, tagline, **Magsimula**.
2. **Home / Map Overlay**: schematic map with every route, mode filters (Jeep, Bus, Rail, UV, Trike, P2P), search "Saan ka pupunta?", and an ad banner (hidden for Premium).
3. **Road Inspector**: tap any road. The segment highlights and a sheet shows "This road · N routes".
4. **Route Planner**: origin and destination with hub suggestions. It has three demo pairs: PITX → Ayala, EDSA–Taft → BGC, and Magallanes → Ortigas. Pick an option to draw it on the map and see the **SAKAY / BABA / TRIKE** step cards, including the "Para alert: 1 stop before" toggle.
5. **Transport Detail**: Verified badge, fare range with its legal basis, 20% student/senior/PWD toggle, stops, **Confirm** and **Report**.
6. **Premium**: ₱99 / 3 months paywall with a fake checkout. After subscribing, ads disappear, **Save** appears on trips, and **Saved routes** and **Offline Mode** appear in the menu.
7. **Comments**: a tab on Transport Detail with 3 sample comments and a disabled "Coming soon" input.
8. **For Operators**: partner portal for a fictional P2P operator. It has a Verified Partner badge, an editable schedule, an advisory composer, a demand report with a bar chart, and partnership pricing.

You can also tap a hub on the map (Mula dito / Papunta dito) or a yellow TODA zone.

## How to open it

**Double-click `index.html`.** It opens in your default browser and works with no internet connection. Keep the five files in the same folder.

For the pitch on a Windows laptop:
- Use Chrome or Edge and press **F11** for full screen. The phone frame scales to the window height, so full screen gives the largest phone.
- If the phone looks too small, press **Ctrl+0** to reset the browser zoom.

### Preview with VS Code Live Server

1. In VS Code, open the Extensions view (Ctrl+Shift+X) and install **Live Server** (by Ritwick Dey).
2. Open this folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server**.
4. It opens at `http://127.0.0.1:5500/index.html` and reloads every time you save a file.

## Publish on GitHub Pages (browser only, no Git needed)

1. Sign in at [github.com](https://github.com), click **+ → New repository**, name it (for example `tarapara-prototype`), set it to **Public**, and click **Create repository**.
2. On the new repository page, click **uploading an existing file** (or **Add file → Upload files**).
3. Drag in `index.html`, `styles.css`, `data.js`, `app.js` and `README.md`, then click **Commit changes**.
   Only upload these five files. A public repository shows everything in it to anyone, so leave out the pitch deck and business plan unless you mean to share them.
4. Go to **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose **main** and **/ (root)**, and click **Save**.
5. Wait one or two minutes and refresh the page. The live link appears at the top, for example `https://<your-username>.github.io/tarapara-prototype/`.

To update the site later, upload the changed files again with **Add file → Upload files**. All paths are relative, so the same files work on GitHub Pages without changes.

## Demo helpers (desktop)

A yellow **Demo** button sits outside the phone frame (top right). It opens a presenter panel with the guided path, screen jumps and **Reset demo**. The panel is hidden on phones and narrow windows.

| Key | Action |
|---|---|
| `1`–`8` | Jump to screens 1–8 (Welcome, Home, Road Inspector, Route Planner, Transport Detail, Premium, Comments, For Operators) |
| `N` | Next step of the guided path |
| `R` | Reset the demo (back to Welcome, free plan, nothing saved) |
| `H` | Show or hide the demo panel |
| `Esc` | Close the current sheet, page or dialog |

You can also link straight to a screen with `index.html#s=5` (screens 1–8) or to a guided step with `index.html#g=4`.

### Guided path (about 90 seconds)

1. **Home**: "Every jeep, bus, rail, UV, trike and P2P route on one map." Toggle a filter chip.
2. **Tap EDSA** (between EDSA–Taft and Magallanes): "This road · 7 routes." Point out "Bawal ang trike sa EDSA."
3. **Plan PITX → Ayala**: tap the search bar, pick *PITX → Ayala* under Demo trips. Three options appear.
4. **Pick Cheapest** (66 min · ₱41): walk through SAKAY (Bay 5 photo, signboard, fare with its basis), BABA (pharmacy on the corner, turn on **Para alert**; a notification pops up after about 4 seconds), and TRIKE (TODA zone, fare per city ordinance, Verified).
5. **Tingnan ang detalye** on the jeep: Verified Sep 2026, ₱17 – ₱38, LTFRB order Mar. 2026, 20% discount toggle, **Comments** tab.
6. **Premium**: tap "Save this trip… · Premium", then **Subscribe → Pay ₱99 → Tara na!** Back on the trip, tap **Save**.
7. **Offline**: menu → **Offline Mode**. The banner reads "Offline — showing saved routes" and the saved trip still opens.
8. **For Operators**: menu → **For Operators**. Show Verified Partner, "1,240 searches · 310 found no good option", the chart, Edit, Post advisory, and the pricing.

Each step in the panel sets up its own state, so you can jump to any step if something goes wrong mid-demo.

## Assumptions

These are the decisions made while building, since the prototype was built in one pass without questions.

1. **Cheapest PITX → Ayala shows "1 transfer", not "2 transfers".** The brief and slide 6 say 2 transfers, but the demo journey is a modern jeep from PITX Bay 5 followed by a trike (SAKAY → BABA → TRIKE), which is one transfer. A second transfer would need three rides, and three rides can't total ₱41 when a modern jeep ride alone costs at least ₱17. Time (66 min) and fare (₱41) match the brief exactly, and every option's legs add up to its totals. The simplest fix for consistency is to change slide 6 to "1 transfer".
2. **All three PITX → Ayala options end with a short trike ride** (Bangkal TODA) to Janna's office near Ayala. This gives the last kilometer described in the business plan. Trike fares differ by pickup point (₱13, ₱15, ₱21).
3. **Magallanes → Ortigas** has no transfers in any option, so its middle option is labeled **Most comfortable** (the Sinag P2P partner) instead of "Fewest transfers". This also shows a partner inside a trip plan.
4. **Fares** follow an illustrative 2026 matrix: traditional jeep from ₱14, modern jeep ₱17–₱38, city bus from ₱15, MRT-3 ₱16–₱31, LRT-1 ₱16–₱55, UV Express fixed per route, tricycles per city ordinance. The 20% discount is applied to the fare range.
5. **PITX rail access** uses LRT-1 Asia World (PITX) station on the Cavite extension.
6. **The map is schematic**: positions are hand-placed world units, not coordinates, and it says "not to scale" on screen. Pasig Rotonda, TODA zone shapes and road alignments are approximate.
7. **Names are illustrative.** Sinag P2P, the "Kape Kanto" ad, cooperative names, comments and commenters are fictional. TODA names use real barangay names, but their zones and fares are examples.
8. **Premium, checkout, saving, reports, confirmations, schedule edits and advisories live in memory only.** Reloading the page or pressing `R` starts fresh. Only the demo panel's open or closed state is remembered in the browser.
9. **The Para alert** is simulated. Turning it on shows an in-phone notification about 4 seconds later.
10. **The user persona** in the menu is "Janna" from the business plan.
11. **The demo panel** opens by default on windows at least 1280 px wide and never shows on phones.
12. **The `N` key** (next guided step) and **`Esc`** were added alongside the requested `1`–`8`, `R` and `H` shortcuts.
13. **Browser support** targets current Chrome, Edge, Firefox and Safari. The prototype was checked in Microsoft Edge at 1920×1080, 1366×768 and 390×844 (phone), with no console errors.

## Editing the data

Everything the prototype shows comes from `data.js`:
- `nodes`: hub and junction positions on the schematic map (x to the right, y down).
- `roads`: which nodes each road connects. Roads are split into tappable segments at hubs and junctions (`j: 1`).
- `routes`: each route's `path` (node ids), stops, fare, fare basis, frequency, verified date and operator. TODA routes use a `zone` polygon instead of a path.
- `trips`: the three demo pairs. Each option lists its legs. Keep `mins`, `fare` and `transfers` equal to the sum of the legs.
- `operator`: the partner portal content, demand numbers and pricing.
