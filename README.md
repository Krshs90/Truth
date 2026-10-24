# Truth: A Texas-First Civic Intelligence Windows Desktop & Web App

> **Tagline:** *See beyond the spin.*  
> **Core message:** *Understand your candidates. Investigate the claims. Decide for yourself.*

**Truth** is a nonpartisan, evidence-based civic research platform built for Windows and the modern web, designed to help voters understand elections, investigate political statements, and verify claims against primary government records. Built for the **Congressional App Challenge**, Truth connects campaign advertisements and rhetoric directly to original Texas legislative journals, statutory bills, and official congressional roll-call votes.

---

## Architecture & Whispr-Inspired UI Experience

Truth's Windows desktop application and UI design language adopt the architectural and animation standards of **Whispr**:

1. **Native Frameless Windows Desktop App (Electron)**:
   - Custom draggable title bar (`-webkit-app-region: drag`) with live Glowing Orb system indicator.
   - Native Windows desktop controls (`-webkit-app-region: no-drag`): Minimize, Maximize/Restore, and Close with danger red hover state (`#FF3B30`).
   - Windows desktop launcher script (`scripts/launch-default-desktop.ps1`) executing into the interactive `WinSta0\Default` desktop station.
   - Runs seamlessly both as a native Windows desktop app (`npm run electron:dev`) and as a web application (`npm run dev`).

2. **Whispr Cyber-Editorial Visual Design**:
   - Deep obsidian / carbon dark mode (`#141414` / `#1A1A1A`).
   - Warm ivory typography (`#FFFFEB`) with high readability.
   - Hairline architectural borders (`#2A2A2A` / `#31312F`).
   - Slim custom 6px scrollbars (`thumb: #31312F`).

3. **Spring Physics & Micro-Interactions (`framer-motion`)**:
   - Route transitions with `<AnimatePresence mode="wait">` using natural spring dynamics (`{ type: "spring", stiffness: 380, damping: 28 }`).
   - Card hover lifts (`whileHover={{ y: -2, borderColor: '#3A3A3A' }}`).
   - Button tap scale feedback (`whileTap={{ scale: 0.97 }}`).

4. **Floating Dynamic Civic Island**:
   - A floating pill dock at the bottom of the screen featuring a live pulsing Glowing Orb indicator.
   - Real-time active district display (e.g. `TX-37 • SD-14`).
   - One-click spring expansion for instant political statement verification from anywhere in the app.

---

## Key Features

1. **Onboarding Setup Wizard**:
   - First-time interactive modal introducing the nonpartisan charter, Texas district selection, and local AI engine preferences.
   - Re-openable anytime via the "District Setup" badge in the top bar.

2. **My District (`/district`)**:
   - Personalized civic intelligence for U.S. Congressional, Texas Senate, and Texas House districts.
   - ZIP-based geographic mapping with explicit electoral disclaimers (recognizing that ZIP codes in Texas frequently span multiple legislative boundaries).
   - First-class manual district selectors for full user control without requiring a home address.
   - Comprehensive profiles of current elected officials and verified candidates, featuring documented voting records and sponsored bills.

3. **Claim Investigation Workspace (`/investigate` & `/investigate/:id`)**:
   - Auditable, 4-step evidential pipeline:
     1. **Extract Claims:** Decomposes input into individual assertions, distinguishing factual claims from future predictions, opinions, and value judgments.
     2. **Retrieve Evidence:** Scans indexed collections of primary statutes, legislative journals, and nonpartisan fact-checks.
     3. **Evaluate Evidence:** Assesses statutory scope, jurisdiction, timeline, and potential omissions.
     4. **Transparent Dossier:** Produces a 10-point dossier linking every assertion to verified primary source documents.
   - 7 analytical verdict categories (e.g., *Supported by evidence*, *Misleading or missing important context*, *Unverified*, *Opinion or prediction*).
   - Support for plain text claims, full political ad transcripts, SSRF-protected public URL article extraction, and a pre-researched Texas claims catalog.

4. **Candidate Comparison Matrix (`/compare`)**:
   - Side-by-side comparison of candidates across key Texas policy areas: Education & Vouchers, Taxes & Spending, Border Security, Healthcare & Medicaid, Energy & Grid Reliability, and Reproductive Rights.
   - Strict adherence to documented records: distinguishes *Documented Legislative Action* and *Public Stated Position* from *Insufficient Public Record*.
   - Never calculates partisan scores, popularity rankings, or recommendations on who to vote for.

5. **Government & Legislative Tracker (`/government`)**:
   - Searchable legislative database covering enacted statutes, failed amendments, and pending proposals from the Texas Legislature (87th & 88th sessions) and U.S. Congress.
   - Distinct statuses (*Enacted*, *Failed*, *Passed Chamber*, *In Committee*, *Introduced*) ensuring introduced bills are never mischaracterized as law.
   - Detailed roll-call breakdowns with individual representative votes and links to official legislative journals.

6. **Sources & Methodology (`/sources`)**:
   - Comprehensive explanation of evidence hierarchy (primary statutory archives vs. secondary reporting).
   - Complete directory of trusted sources with reliability notes and last-checked dates.
   - Full record-level **Data Provenance & Audit Log** documenting retrieval timestamps, verification methods, and public access terms.
   - Public correction submission interface.

7. **Settings & Privacy Controls (`/settings`)**:
   - Zero user profiling: no login, no email, no address tracking.
   - District selections stored exclusively in client-side HTML5 LocalStorage.
   - Optional local Ollama inference configuration for fully offline, zero-cloud natural language summaries.

---

## Technology Stack

- **Desktop Framework:** Electron v45, frameless custom window title bar
- **Frontend:** React 19, TypeScript (strict mode), Vite
- **Styling:** Tailwind CSS v4, Lucide Icons, Whispr Deep Obsidian Dark Theme
- **Animations:** Framer Motion v14 (spring physics: `stiffness: 380, damping: 28`)
- **Routing:** React Router v7 with animated `<AnimatePresence>` transitions
- **State & Data Management:** TanStack Query v5, React Context API, LocalStorage persistence
- **Backend / Proxy (Optional):** Node.js / Express with SSRF-safe URL reader and local Ollama proxy
- **Testing & Quality Assurance:** Vitest, React Testing Library, `@testing-library/jest-dom/vitest`, jsdom, Playwright

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended; developed and tested on Node v24)
- npm (v9 or higher)

### Installation

Clone the repository and install dependencies:

```bash
cd "Truth - CAC"
npm install
```

### Running the Application

Truth is designed to run locally with zero API keys and zero cost.

#### Option A: Windows Desktop Application (Recommended)
Spawns the local backend, Vite bundler, and native frameless Electron desktop app:

```bash
npm run electron:dev
```

#### Option B: Web Browser Development Mode
Runs the complete client-side application with deterministic civic intelligence engine in your browser:

```bash
npm run dev
```

Open `http://localhost:5173` in your web browser.

#### Option C: Full Stack Mode (Web + Backend Proxy)
Runs both the Vite frontend and Express backend proxy concurrently:

```bash
npm run start:all
```

- Client: `http://localhost:5173`
- Backend API: `http://localhost:3001`

---

## Running the Automated Test Suite

Truth includes 29 automated unit, integration, and evidence-integrity tests:

```bash
npm run test
```

### Running Production Build Verification

```bash
npm run build
```

The production bundle will be built into the `dist/` folder with route-based code splitting.

---

## Evidence Integrity Guarantees

As required by Section 15 of the specification, the test suite verifies that:
1. **Unverified Claims:** An unsupported claim is never automatically labeled false without contradictory evidence.
2. **Zero Hallucination:** A missing source never produces a fabricated URL or citation.
3. **Statutory Accuracy:** An introduced bill is never presented as enacted law.
4. **Attribution:** No roll-call vote is attributed to an official without an official journal source link.
5. **Nonpartisanship:** Candidate positions are never inferred from political party affiliation.
6. **Citation Integrity:** Every factual assertion in an investigation links to an existing evidence record.
7. **Nuance:** Conflicting records trigger explicit missing context explanations.
8. **Provenance:** Source publication dates are strictly distinguished from retrieval timestamps.
9. **Transparency:** AI-assisted outputs are labeled distinctly from primary source records.

---

## Optional Local AI Inference (Ollama)

Truth requires **no paid APIs** (OpenAI, Anthropic, or Gemini). If you have [Ollama](https://ollama.com/) installed locally:
1. Start Ollama: `ollama run llama3`
2. Navigate to **Settings** (`/settings`) or use Step 3 of the **District Setup Wizard**.
3. Check **Enable Local Ollama for grounded claim summaries**.
4. Test the connection. When active, Ollama summarizes verified evidence using strict grounded constraints.
5. If Ollama is offline or unavailable, Truth automatically falls back to its deterministic rule-based engine with zero degradation of core functionality.

---

## License & Attribution

Developed as a demonstration civic intelligence platform for the Congressional App Challenge. All statutory texts and legislative records are sourced from public domain government publications of the State of Texas (Texas Legislature Online) and the United States Government (Congress.gov).
