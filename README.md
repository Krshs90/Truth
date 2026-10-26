<p align="center">
  <img src="docs/banner.png" alt="Truth - See beyond the spin" width="100%" />
</p>

<p align="center">
  <b>See beyond the spin.</b><br/>
  A nonpartisan, Texas-first civic research app that checks political claims against real government records.
</p>

<p align="center">
  <img alt="Congressional App Challenge" src="https://img.shields.io/badge/Congressional%20App%20Challenge-2026-1f6feb?style=for-the-badge" />
  <img alt="Texas" src="https://img.shields.io/badge/Made%20in-Texas-bf0a30?style=for-the-badge" />
  <img alt="Local AI" src="https://img.shields.io/badge/AI-100%25%20local%20(Ollama)-2ea043?style=for-the-badge" />
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white" />
  <img alt="Electron" src="https://img.shields.io/badge/Electron-desktop-47848f?logo=electron&logoColor=white" />
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-4-06b6d4?logo=tailwindcss&logoColor=white" />
  <img alt="Tests" src="https://img.shields.io/badge/tests-37%20passing-2ea043" />
  <img alt="No API keys" src="https://img.shields.io/badge/API%20keys-none%20needed-8957e5" />
</p>

---

## Why I built this

Election season is loud. Ads say a bill "raised your taxes" or "protected the border," and it's hard to tell what's true without digging through legislative journals most people have never opened.

I wanted a tool that does the digging for you, without telling you who to vote for. **Truth** lets you paste a claim, an ad transcript, or a link to an article. It then lines the claim up against the actual bills, votes, and public records, and shows its work. It never uses a "trust me" verdict. If there's no evidence either way, it says so.

## What it does

| Feature | What you get |
| --- | --- |
| **Claim Investigation** | Paste a claim, ad, or URL. Truth splits it into individual assertions, finds matching records, and explains what the evidence does and doesn't support. |
| **My District** | Enter a ZIP or pick your U.S. House, Texas Senate, and Texas House districts to see your officials and candidates. |
| **Compare Candidates** | Side-by-side positions on education, taxes, the border, healthcare, energy, and more. It only shows documented actions and statements, with no scores and no endorsements. |
| **Government Tracker** | Searchable Texas Legislature and Congress bills, with clear status labels so an introduced bill is never passed off as law. |
| **Interactive Texas Map** | Explore districts and counties, and see how areas voted. |
| **Sources & Methodology** | Every source, how it's ranked, and when it was last checked. |
| **Civic Island** | A floating bar that lets you check a statement from anywhere in the app. |
| **Local AI Assistant** | Ask questions in plain English. Answers are grounded in the evidence on screen. |

## How it stays honest

- **No keyword "fact-checking."** Live news headlines are labelled *Unchecked* until they are actually reviewed. Nothing is stamped "true" or "false" because of a word in the title.
- **Evidence-grounded AI.** The model is told to use only the retrieved records and to say "unverified" when the records don't cover a claim.
- **Nothing fabricated.** A missing source never produces an invented link or citation.
- **Non-partisan by design.** Positions are never inferred from party, and Truth never recommends a candidate.
- **Private by default.** There are no accounts, no tracking, and no analytics. Your district choice stays in your browser's local storage.
- **Safe link reader.** The article reader blocks requests to private, loopback, and cloud-metadata addresses, and re-checks every redirect.

## Run it

### Download (Windows)

Grab **`Truth-V1-win-x64.zip`** from the [latest release](https://github.com/Krshs90/Truth/releases/latest), unzip it, and double-click `Truth.exe`. No install and no accounts are needed. The app isn't code-signed, so Windows SmartScreen may warn you the first time. Click **More info → Run anyway**.

### From source

You need [Node.js](https://nodejs.org/) 18+. No API keys, accounts, or paid services are required.

```bash
git clone https://github.com/Krshs90/Truth.git
cd Truth
npm install
```

**Web app**
```bash
npm run dev          # http://127.0.0.1:5173
```

**Desktop app (Windows)**
```bash
npm run electron:dev
```

**Full stack (separate Express backend)**
```bash
npm run start:all
```

**Build the Windows executable yourself**
```bash
npm run package:win   # outputs release/Truth-win32-x64/Truth.exe
```

### Optional: turn on the local AI

1. Install [Ollama](https://ollama.com/download) and pull a model, for example `ollama pull llama3.2`.
2. Open **Settings** in Truth (or the setup wizard) and enable Ollama.
3. Everything runs on your own machine. Nothing is sent to the cloud.

If Ollama isn't running, Truth falls back to its built-in evidence matching and still works.

## Under the hood

```
src/            React app: pages, components, services, curated data
server/         Express + Vite dev API: AI proxy, safe URL reader, live news sync
electron/       Desktop shell
scripts/        Data-building helpers
```

Built with React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion, React Router, TanStack Query, Leaflet, Express, Electron, and Vitest.

```bash
npm test            # unit + integration tests
npm run build       # type-check and production build
npm run lint
```

## Sources

Records come from public government publications: [Texas Legislature Online](https://capitol.texas.gov/), [Congress.gov](https://www.congress.gov/), the Texas Secretary of State, and official court and agency sites. Live headlines come from public news RSS feeds and are always marked as unchecked reporting, not verified fact.

## Known limitations

- Coverage is Texas-only, and the curated claim library is hand-built, so it is not exhaustive.
- Some archived source links may have moved since they were collected. If you find a broken one, please open an issue.
- ZIP codes can span several districts, so Truth shows a best match and lets you choose your district manually.

## About

Built for the **Congressional App Challenge**. Truth is a research aid. Always read the primary sources and make up your own mind.
