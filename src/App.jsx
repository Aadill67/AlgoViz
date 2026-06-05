import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import {
  getBubbleSortAnimations,
  getSelectionSortAnimations,
  getInsertionSortAnimations,
  getMergeSortAnimations,
  getQuickSortAnimations,
} from './algorithms/sorting';

// ─── Algorithm metadata ────────────────────────────────────────────────────────
const ALGORITHMS = {
  'Bubble Sort': {
    fn: getBubbleSortAnimations,
    desc: 'Repeatedly compares adjacent elements and swaps them if out of order. Classic O(n²) — great for learning.',
    complexity: { worst: 'O(n²)', best: 'O(n)', space: 'O(1)' },
  },
  'Selection Sort': {
    fn: getSelectionSortAnimations,
    desc: 'Finds the minimum element from the unsorted portion and places it at the front. Always O(n²) comparisons.',
    complexity: { worst: 'O(n²)', best: 'O(n²)', space: 'O(1)' },
  },
  'Insertion Sort': {
    fn: getInsertionSortAnimations,
    desc: 'Builds the sorted array one element at a time. Extremely efficient for small or nearly-sorted arrays.',
    complexity: { worst: 'O(n²)', best: 'O(n)', space: 'O(1)' },
  },
  'Merge Sort': {
    fn: getMergeSortAnimations,
    desc: 'Divide-and-conquer: splits array in half, sorts each half, merges results. Stable and guaranteed O(n log n).',
    complexity: { worst: 'O(n log n)', best: 'O(n log n)', space: 'O(n)' },
  },
  'Quick Sort': {
    fn: getQuickSortAnimations,
    desc: 'Picks a pivot and partitions elements around it. The fastest in practice — used in most standard libraries.',
    complexity: { worst: 'O(n²)', best: 'O(n log n)', space: 'O(log n)' },
  },
};

const PATTERNS = ['Random', 'Reversed', 'Nearly Sorted', 'Few Unique'];

// ─── Array generation ──────────────────────────────────────────────────────────
function generateArray(size, pattern) {
  const sorted = Array.from({ length: size }, (_, i) =>
    Math.round(5 + (i / Math.max(size - 1, 1)) * 93)
  );

  switch (pattern) {
    case 'Reversed':
      return [...sorted].reverse();

    case 'Nearly Sorted': {
      const arr = [...sorted];
      const swapCount = Math.max(3, Math.floor(size * 0.08));
      for (let k = 0; k < swapCount; k++) {
        const a = Math.floor(Math.random() * size);
        const b = Math.floor(Math.random() * size);
        [arr[a], arr[b]] = [arr[b], arr[a]];
      }
      return arr;
    }

    case 'Few Unique': {
      const vals = [12, 28, 45, 65, 88];
      return Array.from({ length: size }, () => vals[Math.floor(Math.random() * vals.length)]);
    }

    default: // Random
      return Array.from({ length: size }, () => Math.floor(Math.random() * 91) + 9);
  }
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function App() {
  const [array,     setArray]     = useState([]);
  const [colors,    setColors]    = useState([]);
  const [arraySize, setArraySize] = useState(60);
  const [speed,     setSpeed]     = useState(55);
  const [pattern,   setPattern]   = useState('Random');
  const [algo,      setAlgo]      = useState('Bubble Sort');
  const [isSorting, setIsSorting] = useState(false);
  const [isDone,    setIsDone]    = useState(false);
  const [stats,     setStats]     = useState({ comparisons: 0, swaps: 0, elapsed: null });

  const timerRef  = useRef(null);
  const speedRef  = useRef(speed);
  const startRef  = useRef(null);

  // Keep speedRef in sync so animation always uses the latest speed
  useEffect(() => { speedRef.current = speed; }, [speed]);

  const delay = () => Math.max(3, 525 - speedRef.current * 5.22);

  // ── Reset array ──────────────────────────────────────────────────────────────
  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const arr = generateArray(arraySize, pattern);
    setArray(arr);
    setColors(new Array(arr.length).fill('default'));
    setIsSorting(false);
    setIsDone(false);
    setStats({ comparisons: 0, swaps: 0, elapsed: null });
  }, [arraySize, pattern]);

  useEffect(() => { reset(); }, [arraySize, pattern]); // eslint-disable-line

  // ── Sort ─────────────────────────────────────────────────────────────────────
  const handleSort = () => {
    if (isSorting) return;

    const animations = ALGORITHMS[algo].fn([...array]);
    let arr   = [...array];
    let comps = 0;
    let swps  = 0;

    setIsSorting(true);
    setIsDone(false);
    startRef.current = Date.now();

    const step = (i) => {
      if (i >= animations.length) {
        // All done — paint everything green
        setColors(new Array(arr.length).fill('sorted'));
        setIsSorting(false);
        setIsDone(true);
        setStats({
          comparisons: comps,
          swaps: swps,
          elapsed: ((Date.now() - startRef.current) / 1000).toFixed(2),
        });
        return;
      }

      const frame = animations[i];
      const c = new Array(arr.length).fill('default');

      if (frame.type === 'compare') {
        comps++;
        c[frame.indices[0]] = 'compare';
        c[frame.indices[1]] = 'compare';
      } else if (frame.type === 'swap') {
        swps++;
        [arr[frame.indices[0]], arr[frame.indices[1]]] = [arr[frame.indices[1]], arr[frame.indices[0]]];
        c[frame.indices[0]] = 'swap';
        c[frame.indices[1]] = 'swap';
      } else if (frame.type === 'overwrite') {
        arr[frame.index] = frame.value;
        c[frame.index]   = 'swap';
        swps++;
      }

      setArray([...arr]);
      setColors([...c]);
      setStats({ comparisons: comps, swaps: swps, elapsed: null });

      timerRef.current = setTimeout(() => step(i + 1), delay());
    };

    step(0);
  };

  // ─── Derived values ──────────────────────────────────────────────────────────
  const maxVal  = Math.max(...array, 1);
  const info    = ALGORITHMS[algo];
  const barWidth = Math.max(2, Math.min(24, Math.floor((840 - array.length) / array.length)));

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="app">
      {/* ── Header ── */}
      <header>
        <h1><span className="lightning">⚡</span> AlgoViz</h1>
        <p>Interactive Sorting Algorithm Visualizer</p>
      </header>

      {/* ── Algorithm Selector ── */}
      <section className="card">
        <div className="label">Algorithm</div>
        <div className="algo-tabs">
          {Object.keys(ALGORITHMS).map((name) => (
            <button
              key={name}
              className={`tab ${algo === name ? 'active' : ''}`}
              onClick={() => { if (!isSorting) setAlgo(name); }}
              disabled={isSorting}
            >
              {name}
            </button>
          ))}
        </div>
        <p className="algo-desc">{info.desc}</p>
        <div className="complexity-row">
          <span className="badge badge-red">Worst {info.complexity.worst}</span>
          <span className="badge badge-green">Best {info.complexity.best}</span>
          <span className="badge badge-purple">Space {info.complexity.space}</span>
        </div>
      </section>

      {/* ── Controls ── */}
      <section className="card controls-grid">
        <div className="slider-group">
          <div className="label">Array Size <strong>{arraySize}</strong></div>
          <input type="range" min="10" max="130" value={arraySize}
            onChange={(e) => !isSorting && setArraySize(+e.target.value)}
            disabled={isSorting} />
        </div>
        <div className="slider-group">
          <div className="label">Speed <strong>{speed}%</strong></div>
          <input type="range" min="1" max="100" value={speed}
            onChange={(e) => setSpeed(+e.target.value)} />
        </div>
        <div className="pattern-group">
          <div className="label">Input Pattern</div>
          <div className="pattern-tabs">
            {PATTERNS.map((p) => (
              <button key={p}
                className={`tab sm ${pattern === p ? 'active' : ''}`}
                onClick={() => !isSorting && setPattern(p)}
                disabled={isSorting}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats + Actions ── */}
      <div className="stats-bar">
        <div className="stat">
          <span className="stat-label">Comparisons</span>
          <span className="stat-value">{stats.comparisons.toLocaleString()}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Swaps</span>
          <span className="stat-value">{stats.swaps.toLocaleString()}</span>
        </div>
        {stats.elapsed && (
          <div className="stat">
            <span className="stat-label">Time</span>
            <span className="stat-value elapsed">{stats.elapsed}s</span>
          </div>
        )}
        <div className="action-btns">
          <button className="btn-ghost" onClick={reset} disabled={isSorting}>
            🔀 New Array
          </button>
          <button className="btn-primary" onClick={handleSort} disabled={isSorting || isDone}>
            {isSorting ? '⏳ Sorting…' : isDone ? '✅ Done!' : '▶ Sort'}
          </button>
        </div>
      </div>

      {/* ── Visualizer ── */}
      <div className="visualizer">
        {array.map((val, i) => (
          <div
            key={i}
            className={`bar bar-${colors[i] || 'default'}`}
            style={{
              height: `${(val / maxVal) * 100}%`,
              width:  `${barWidth}px`,
            }}
          />
        ))}
      </div>

      {/* ── Legend ── */}
      <div className="legend">
        {[
          { cls: 'default', label: 'Unsorted'  },
          { cls: 'compare', label: 'Comparing' },
          { cls: 'swap',    label: 'Swapping'  },
          { cls: 'sorted',  label: 'Sorted'    },
        ].map(({ cls, label }) => (
          <span key={cls} className="legend-item">
            <span className={`dot dot-${cls}`} /> {label}
          </span>
        ))}
      </div>
    </div>
  );
}
