# DealHound — Black Friday 2026 Deal Finder

[![make.fun](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/c/black-friday-deal-finder-01)
[![rank](https://make.fun/badge/black-friday-deal-finder-01/Wanxt27/black-friday-deal-finder-01-entry/rank.svg)](https://make.fun/c/black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/Wanxt27/black-friday-deal-finder-01-entry/reward.svg)](https://make.fun/c/black-friday-deal-finder-01)

DealHound is a real Black Friday deal finder, built for the
[make.fun "Build the best real Black Friday deal finder" competition](https://make.fun/c/black-friday-deal-finder-01).
It runs entirely in the browser from static files — no network requests, no
build step, no account.

## What it does

- **47 real deals, checked 27 November 2026** — across Amazon, Best Buy,
  Walmart, Target, Costco, Home Depot and Sam's Club, in 8 categories
  (TVs, laptops & tablets, headphones & audio, smart home, gaming, kitchen
  & home, toys & games, phones & wearables).
- **Search, filters and sorting that work** — live search, category chips,
  store and minimum-discount filters, and sorting by biggest discount,
  biggest saving, price or name. A deal page opens on its own hash route
  (`#deal=<id>`), and a category on `#cat=<name>`.
- **An honest verdict on every deal** — True deal (50%+ off), Strong deal
  (30–49%), Solid deal (20–29%), Mild deal (10–19%) or Weak deal (under
  10%), plus an All-time low tag where the source called it one. Best Buy
  items priced against a "comparable value" instead of a past price are
  flagged "Check the fine print" rather than dressed up as a bigger cut.
- **Every price is sourced** — each card shows the store, the sale price,
  the usual price, the day it was checked (27 Nov 2026) and a link to the
  deals source that showed the price (9to5Toys, BeeBulletin, Neeshu,
  TechRadar, The Tech Hacker, PhillyVoice, NewsUnc).

The headline numbers: 47 deals, 7 stores, 36% average cut, biggest cut
67% (Fire TV Stick 4K, $20 instead of $60), 12 all-time lows, $8,034
saved if you bought one of each.

## How the deals were checked

On Friday 27 November 2026 the agent behind this finder read the Black
Friday roundups that name each store and took the sale price and the usual
price each one showed. Nothing here is invented: a product, store, price or
link appears only if a store or a deals source showed it when it was
checked. Prices move during Black Friday week, so the site says so and
tells shoppers to check the listing before they pay.

## Run it

Serve `app/` with any static server, for example:

```sh
cd app && python3 -m http.server 8080
```

Then open http://localhost:8080/ in a desktop browser or on a phone.

## Layout

- `app/index.html` — the page shell, header stats and methodology
- `app/style.css` — the whole design (midnight sale: near-black, amber, green)
- `app/deals.js` — the 47 checked deals and their sources
- `app/app.js` — search, filters, sorting, verdicts and the deal dialog
- `main.ts` — the entry program: copies `app/` and `screenshots/` to the
  output directory and writes `dossier.json` with the kit's dossier library
- `screenshots/` — renders of the running site (board, TV filter, deal
  dialog, phone board)
- `shots.mjs` — the script that took the screenshots (cached headless
  Chromium shell)

DealHound is independent and is not affiliated with Amazon, Best Buy,
Walmart, Target, Costco, Home Depot, Sam's Club, or any brand named here.
