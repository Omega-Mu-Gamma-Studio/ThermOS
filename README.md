# 🌡️ ThermOS

> **A collection of 5 interactive browser-based modules for ME22301 — Engineering Thermodynamics.**
> Part of the [Omega Mu Gamma Studio](https://github.com/Omega-Mu-Gamma-Studio) open-source engineering education toolkit.

---

## 📌 Overview

**ThermOS** is a surgical toolkit of five interactive visualization modules, each targeting a single abstract concept from the ME22301 — Engineering Thermodynamics syllabus and making it tangible through simulation, 3D exploration, and the studio's proven pedagogical model.

This is not a course replacement. It is the tool you open when a diagram stops making sense.

> **The invisible becomes visible.**

Energy, entropy, enthalpy — thermodynamics is uniquely challenging because its core concepts cannot be seen. Students mentally model abstract 3D surfaces from 2D textbook diagrams and memorize property tables without understanding the underlying physics. ThermOS solves this by rendering what textbooks can only describe.

ThermOS is the seventh project released under Omega Mu Gamma Studio, joining [SeeDS](https://see-ds.vercel.app), [Java-Chan](https://java-chan.vercel.app), [KMapX](https://kmapx.vercel.app), [EG Suite](https://eg-suite.vercel.app), [GateLab](https://github.com/Omega-Mu-Gamma-Studio/GateLab), and [ArchVisor](https://github.com/Omega-Mu-Gamma-Studio/ArchVisor) as part of the studio's growing suite of open-source engineering education tools.

---

## 🎯 Course Context

| Field | Details |
| --- | --- |
| **Course Code** | ME22301 |
| **Course Name** | Engineering Thermodynamics |
| **Department** | Mechanical Engineering |
| **Credits** | L T P C — 3 1 0 4 |
| **Total Periods** | 60 |
| **Textbooks** | Nag P.K. — *Engineering Thermodynamics* (5th Ed.), Cengel & Boles — *Thermodynamics: An Engineering Approach* (8th Ed.) |

---

## ✨ Modules

ThermOS ships as **five self-contained interactive modules**, each covering the most abstract concept from one unit of the ME22301 syllabus.

---

### 🔷 M1 — PVT Explorer ⭐ *(Units III & IV)*

The flagship. A fully interactive 3D P-V-T surface for water — nothing like it exists freely online for engineering students.

| Feature | Technology | Complexity |
| --- | --- | --- |
| 3D PVT surface with orbit controls | `@react-three/fiber` + `drei` | High |
| Hover to reveal state properties | Three.js raycasting | Medium |
| Cut plane → P-V diagram | Three.js + D3.js | Medium |
| Cut plane → T-s diagram | Three.js + D3.js | Medium |
| Animate phase transition path | Three.js animation loop | Medium |
| Critical point + triple point highlight | Three.js + UI | Low |
| Challenge: *"Find the state at 200°C, 5 MPa"* | React + Zustand | Low |

**Pedagogical Flow:** Explore → Discover → Challenge → Scaffold

**Learning Outcomes:** Identify phases on P-v/T-s diagrams · Locate critical and triple points · Relate properties to phase behavior · Determine properties from tables and charts

---

### 🔷 M2 — Cycle Builder *(Units IV & V)*

A 3-phase animated cycle simulator using the studio's proven *See It Work → See It Break → You Try* model.

| Feature | Technology | Complexity |
| --- | --- | --- |
| Phase 1: animated working cycle | React + D3.js | Medium |
| Phase 2: animated broken cycle (irreversibilities) | React + D3.js | Medium |
| Phase 3: student adjusts parameters | React + D3.js | Medium |
| 5 cycles: Otto, Diesel, Brayton, Rankine, Refrigeration | D3.js + engine | High |
| Component schematic (engine / plant) | Konva.js | Medium |
| Real-time efficiency / COP display | React + Zustand | Low |

| Phase | Name | What Happens |
| --- | --- | --- |
| 1 | **See It Work** | The cycle is animated on P-V and T-s diagrams. Component schematic highlights active parts. Efficiency displayed. |
| 2 | **See It Break** | Same cycle with deliberate imperfections — turbine inefficiency, pressure drops, heat losses. Cycle shrinks. Efficiency drops. |
| 3 | **You Try** | Student adjusts parameters (compression ratio, turbine inlet temperature) to optimize. Tool validates and provides hints. |

**Learning Outcomes:** Analyze steam power plant cycles · Calculate thermal efficiency · Show reheat effects on dryness fraction · Compare Rankine and Carnot cycles

---

### 🔷 M3 — Energy Balancer *(Unit I)*

A drag-and-drop energy balance simulator that eliminates sign convention confusion.

| Feature | Technology | Complexity |
| --- | --- | --- |
| System schematic with boundary | Konva.js | Low |
| Drag energy arrows onto schematic | React + Konva.js | Medium |
| Validation: is the balance correct? | Pattern matching | Low |
| 5 scenarios: tank, turbine, compressor, nozzle, heat exchanger | JSON | Low |
| Visual feedback on correct / incorrect placement | React + CSS | Low |

**Learning Outcomes:** Apply first law to energy-transferring devices · Distinguish closed and open systems · Identify when terms in the first law are zero

---

### 🔷 M4 — Entropy Visualizer *(Unit II)*

An interactive T-s diagram that makes entropy generation visible as a colored area — because students cannot see entropy any other way.

| Feature | Technology | Complexity |
| --- | --- | --- |
| T-s diagram with interactive path drawing | D3.js | Medium |
| Real vs. isentropic path side-by-side | D3.js | Medium |
| Entropy generation area highlighted | D3.js | Medium |
| 5 scenarios: turbine, compressor, mixing, heat transfer, throttling | JSON | Low |
| Animate path to show entropy generation in real time | D3.js + animation | Medium |

**Learning Outcomes:** Apply second law to energy-transferring devices · State and apply Clausius inequality · Calculate entropy changes · Understand why entropy of an isolated system never decreases

---

### 🔷 M5 — Property Solver *(Units I & III)*

An intelligent property lookup and interpolation tool that replaces hours of steam table navigation with a visual, interactive solver.

| Feature | Technology | Complexity |
| --- | --- | --- |
| Input two known properties → output all others | Pure JS engine | Medium |
| Steam tables as JSON (water, R134a) | Data authoring | High |
| Linear and double interpolation engine | Pure JS | Medium |
| Visual state on PVT / T-s diagrams | React + D3.js | Medium |
| Ideal gas vs. real gas comparison | Engine + UI | Medium |
| Unit conversion helper | Utility | Low |

**Learning Outcomes:** Determine properties using tabulated data · Use linear and double interpolation · Apply equations of state · Use compressibility charts

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| **Framework** | React 19 + Vite 8 | Fast dev server, consistent with studio stack |
| **State Management** | Zustand 5 | Global state for simulation parameters |
| **Styling** | Tailwind CSS 4 | Utility-first, consistent across modules |
| **Animations** | Framer Motion 12 | UI transitions, panel animations |
| **Routing** | React Router v7 | Module navigation |
| **3D Rendering** | `@react-three/fiber` + `@react-three/drei` | React-friendly Three.js integration (M1) |
| **2D Charts & Diagrams** | D3.js 7 | P-V, T-s, P-h diagrams (M2, M4, M5) |
| **2D Schematics** | Konva.js + react-konva | Component schematics, drag-and-drop (M2, M3) |
| **Simulation Engines** | Pure JS in `src/engines/` | Decoupled, testable, zero React dependencies |
| **Property Data** | JSON files | Steam tables, constants — no backend required |
| **Deployment** | Vercel | Zero-config, consistent with studio deploys |

> All simulation engines live in `src/engines/` as **pure JavaScript functions** — no React imports, no side effects. This keeps them independently testable and allows clean step-state capture for animated walkthroughs. Same architectural rule as ArchVisor.

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^19",
    "react-dom": "^19",
    "react-router-dom": "^7",
    "zustand": "^5",
    "framer-motion": "^12",
    "three": "^0.176",
    "@react-three/fiber": "^9",
    "@react-three/drei": "^9",
    "d3": "^7",
    "konva": "^9",
    "react-konva": "^18"
  },
  "devDependencies": {
    "vite": "^8",
    "@vitejs/plugin-react": "^4",
    "tailwindcss": "^4",
    "@tailwindcss/vite": "^4"
  }
}
```

---

## 🗂️ Folder Structure

```
thermos/
├── index.html
├── package.json
├── vite.config.js
│
├── public/
│   └── favicon.svg
│
└── src/
    ├── main.jsx
    ├── App.jsx                         # Router root, layout shell
    │
    ├── modules/                        # One folder per module — UI only
    │   ├── pvt-explorer/
    │   │   ├── index.jsx               # Module entry + layout
    │   │   ├── PVTSurface.jsx          # 3D Three.js scene
    │   │   ├── CutPlane.jsx            # Cut plane → 2D diagram
    │   │   └── Controls.jsx            # Sidebar UI controls
    │   │
    │   ├── cycle-builder/
    │   │   ├── index.jsx
    │   │   ├── CycleAnimator.jsx       # D3 P-V / T-s diagrams
    │   │   ├── PhaseIndicator.jsx      # Work / Break / Fix tabs
    │   │   └── Schematic.jsx           # Konva component diagram
    │   │
    │   ├── energy-balancer/
    │   │   ├── index.jsx
    │   │   └── EnergyCanvas.jsx        # Konva drag-and-drop
    │   │
    │   ├── entropy-visualizer/
    │   │   ├── index.jsx
    │   │   └── TSDiagram.jsx           # D3 T-s diagram
    │   │
    │   └── property-solver/
    │       ├── index.jsx
    │       ├── PropertyInput.jsx
    │       └── ResultsDisplay.jsx
    │
    ├── engines/                        # Pure JS — zero React, zero side effects
    │   ├── pvtSurface.js               # 3D surface point generation
    │   ├── cycleCalculations.js        # Otto, Diesel, Brayton, Rankine, Refrigeration
    │   ├── energyBalance.js            # First law validation logic
    │   ├── entropyCalc.js              # Entropy change, Clausius inequality
    │   └── propertyLookup.js           # Steam table interpolation (linear + double)
    │
    ├── data/                           # Static JSON property tables
    │   ├── water_sat.json              # Saturated water/steam (from NIST WebBook)
    │   ├── water_superheat.json        # Superheated steam
    │   ├── r134a_sat.json              # Refrigerant R134a
    │   └── constants.json             # Universal constants, critical point data
    │
    ├── store/                          # Zustand slices
    │   ├── simulationStore.js          # Active module parameters
    │   └── uiStore.js                  # Theme preferences, UI state
    │
    ├── hooks/                          # Reusable React hooks
    │   ├── useEngine.js                # Generic engine caller
    │   ├── useSimulation.js            # Binds engine output → Zustand
    │   └── useD3.js                    # D3 ref + resize observer + cleanup pattern
    │
    ├── components/
    │   ├── shell/
    │   │   ├── TopBar.jsx              # Same pattern as ArchVisor
    │   │   └── Layout.jsx
    │   └── ui/
    │       ├── Slider.jsx
    │       ├── Badge.jsx
    │       ├── StepControls.jsx        # Play / Pause / Step / Reset
    │       └── DiagramPanel.jsx        # Shared D3 container wrapper
    │
    ├── pages/
    │   ├── Home.jsx                    # Module picker landing
    │   └── ModulePage.jsx              # Wraps module entry points
    │
    └── styles/
        └── index.css                   # Tailwind + CSS variable theme system
```

---

## 🗓️ Development Roadmap

| Week | Module | Why This Order |
| --- | --- | --- |
| **1 – 4** | M1: PVT Explorer ⭐ | The flagship. The "wow" tool. Nothing like it exists freely online. |
| **5 – 6** | M3: Energy Balancer | Quick win — simple interaction model, high pedagogical value. |
| **7 – 9** | M2: Cycle Builder | 3-phase learning — showcases the studio's proven pedagogical model. |
| **10 – 11** | M4: Entropy Visualizer | Builds directly on M2's D3.js diagram work. |
| **12 – 14** | M5: Property Solver | Utility tool — finishes and completes the collection. |

> M1 and M2 are the development-intensive milestones. M3 ships fast. All five modules are self-contained — they can be developed and deployed independently.

---

## 🚀 Getting Started

### Prerequisites

- Node.js v20+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Omega-Mu-Gamma-Studio/ThermOS.git
cd ThermOS

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📐 Development Guide

### Engine Rules

Every file in `src/engines/` must follow these rules without exception:

- **No React imports.** No hooks, no components, no JSX.
- **Pure functions only.** Same input always returns same output.
- **Step-state capture.** Functions that simulate multi-step processes must return an array of step snapshots, not just the final result. This is what powers the animated walkthroughs.
- **No direct DOM access.** Engines never touch the DOM.

### D3 + React Pattern

D3 and React both want to control the DOM. In ThermOS, React owns the DOM — D3 is used only for its math (scales, interpolation, path generators). All D3 rendering is handled inside `useD3.js` via a ref, with cleanup on unmount. Never call D3 selection methods outside of this hook.

### Adding a New Module

1. Create a folder under `src/modules/your-module-name/`
2. Add `index.jsx` as the module entry point
3. Create the engine file in `src/engines/yourEngine.js` (pure JS, no React)
4. Add a Zustand slice to `src/store/` if the module needs persistent state
5. Register the route in `App.jsx`
6. Add the module card to `src/pages/Home.jsx`

### Data Sources

All property data in `src/data/` was sourced from the **NIST WebBook** (https://webbook.nist.gov) and generated using the `iapws` Python library for accuracy. Do not hand-transcribe steam table values — use the generation scripts in `/scripts/data-gen/` to reproduce or extend the JSON tables.

---

## 🧑‍💻 Contributing

ThermOS is an open-source project under Omega Mu Gamma Studio. Contributions, bug reports, and feature suggestions are welcome.

**Studio Lead & Project Founder:** [Alberto Felix](https://github.com/albertofelix08)
**Co-Lead:** [Aaron](https://github.com/aaronmcgeo)

---

## 🏛️ Part of the Omega Mu Gamma Studio

ThermOS is the seventh tool from Omega Mu Gamma Studio — a student-built suite of open-source engineering education tools built at St. Xavier's Catholic College of Engineering.

| Tool | What It Does |
| --- | --- |
| [SeeDS](https://see-ds.vercel.app) | 3D data structure visualizer |
| [Java-Chan](https://java-chan.vercel.app) | Interactive Java programming learning platform |
| [KMapX](https://kmapx.vercel.app) | Karnaugh map simplifier with don't-care support |
| [EG Suite](https://eg-suite.vercel.app) | 3D Engineering Graphics simulator (ME22201) |
| [GateLab](https://github.com/Omega-Mu-Gamma-Studio/GateLab) | 3D digital logic playground (CS22303) |
| [ArchVisor](https://github.com/Omega-Mu-Gamma-Studio/ArchVisor) | Interactive COA learning platform (CS22304) |
| ThermOS | Interactive thermodynamics modules (ME22301) — *this repo* |

---

## 📚 References

1. P.K. Nag, *Engineering Thermodynamics*, 5th Edition, Tata McGraw-Hill, 2013.
2. Yunus A. Cengel and Michael A. Boles, *Thermodynamics: An Engineering Approach*, 8th Edition, McGraw-Hill, 2015.
3. NIST WebBook — National Institute of Standards and Technology thermophysical property database. https://webbook.nist.gov

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

---

**Omega Mu Gamma Studio** · Open-source engineering education tools · [github.com/Omega-Mu-Gamma-Studio](https://github.com/Omega-Mu-Gamma-Studio)