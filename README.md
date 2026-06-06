<div align="center">

<h1>⚡ AlgoViz</h1>

<p><strong>Interactive Sorting Algorithm Visualizer</strong></p>

[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

<p>
  <a href="https://YOUR-VERCEL-LINK-HERE.vercel.app"><strong>🚀 Live Demo »</strong></a>
</p>

</div>

---

## 📌 Overview

AlgoViz is a clean, interactive web app that animates classic sorting algorithms in real time. Built to bridge the gap between *reading* about an algorithm and actually *seeing* it — every comparison, swap, and merge is visualized step by step.

---

## ✨ Features

- **5 Sorting Algorithms** — Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort
- **Real-Time Animation** — Watch every comparison (🟡) and swap (🔴) happen live
- **Per-Algorithm Description** — Short plain-English explanation of what each algorithm does
- **Big-O Complexity Display** — Worst case, best case, and space complexity shown for every algorithm
- **Speed Control** — Drag the speed slider from 1% (slow motion) to 100% (blazing fast)
- **Array Size Control** — Choose between 10 and 130 elements
- **4 Input Patterns** — Random · Reversed · Nearly Sorted · Few Unique values
- **Live Stats** — Real-time comparison count, swap count, and elapsed time
- **Fully Responsive** — Works seamlessly on mobile and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18 + Hooks |
| Build Tool | Vite 5 |
| Styling | Vanilla CSS with CSS custom properties (dark theme) |
| Algorithms | Pure JavaScript (zero external deps) |
| Deployment | Vercel |

---

## 📂 Project Structure

```
algoviz/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                  # React root
    ├── App.jsx                   # Main component + animation engine
    ├── App.css                   # Dark-themed styles
    └── algorithms/
        └── sorting.js            # All 5 algorithm animation generators
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/Aadill67/AlgoViz.git
cd AlgoViz

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# → Opens at http://localhost:5173
```

**To build for production:**
```bash
npm run build
```

---

## ⚡ Deploy to Vercel (Free)

```bash
npm install -g vercel
vercel
```
Or drag-and-drop the `/dist` folder to [vercel.com/new]([https://vercel.com/new](https://algo-viz-orcin.vercel.app/)).

---

## 🧠 Algorithms Implemented

| Algorithm | Time (Worst) | Time (Best) | Space | Stable |
|-----------|-------------|-------------|-------|--------|
| Bubble Sort | O(n²) | O(n) | O(1) | ✅ |
| Selection Sort | O(n²) | O(n²) | O(1) | ❌ |
| Insertion Sort | O(n²) | O(n) | O(1) | ✅ |
| Merge Sort | O(n log n) | O(n log n) | O(n) | ✅ |
| Quick Sort | O(n²) | O(n log n) | O(log n) | ❌ |

---

## 🔮 Roadmap

- [ ] Graph algorithm visualizations (BFS, DFS, Dijkstra)
- [ ] Pathfinding visualizer
- [ ] Step-through mode (forward / backward one frame at a time)
- [ ] Sound effects tied to bar height

---

## 📄 License

MIT © [Aadil](https://github.com/Aadill67)
