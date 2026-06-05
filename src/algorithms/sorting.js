// ─── Sorting Algorithm Animation Generators ───────────────────────────────────
// Each function takes an array and returns a sequence of animation frames.
// Frame types:
//   { type: 'compare', indices: [i, j] }   — highlight two bars being compared
//   { type: 'swap',    indices: [i, j] }   — swap two bars in the array
//   { type: 'overwrite', index: i, value } — set a single bar (merge sort)

export function getBubbleSortAnimations(arr) {
  const animations = [];
  const a = [...arr];
  const n = a.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push({ type: 'compare', indices: [j, j + 1] });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        animations.push({ type: 'swap', indices: [j, j + 1] });
      }
    }
  }
  return animations;
}

export function getSelectionSortAnimations(arr) {
  const animations = [];
  const a = [...arr];
  const n = a.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      animations.push({ type: 'compare', indices: [minIdx, j] });
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      animations.push({ type: 'swap', indices: [i, minIdx] });
    }
  }
  return animations;
}

export function getInsertionSortAnimations(arr) {
  const animations = [];
  const a = [...arr];
  const n = a.length;

  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0 && a[j - 1] > a[j]) {
      animations.push({ type: 'compare', indices: [j - 1, j] });
      [a[j - 1], a[j]] = [a[j], a[j - 1]];
      animations.push({ type: 'swap', indices: [j - 1, j] });
      j--;
    }
    if (j > 0) animations.push({ type: 'compare', indices: [j - 1, j] });
  }
  return animations;
}

export function getMergeSortAnimations(arr) {
  const animations = [];
  const a = [...arr];

  function mergeSort(a, l, r) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    mergeSort(a, l, m);
    mergeSort(a, m + 1, r);
    merge(a, l, m, r);
  }

  function merge(a, l, m, r) {
    const L = a.slice(l, m + 1);
    const R = a.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;

    while (i < L.length && j < R.length) {
      animations.push({ type: 'compare', indices: [l + i, m + 1 + j] });
      if (L[i] <= R[j]) {
        animations.push({ type: 'overwrite', index: k, value: L[i] });
        a[k++] = L[i++];
      } else {
        animations.push({ type: 'overwrite', index: k, value: R[j] });
        a[k++] = R[j++];
      }
    }
    while (i < L.length) {
      animations.push({ type: 'overwrite', index: k, value: L[i] });
      a[k++] = L[i++];
    }
    while (j < R.length) {
      animations.push({ type: 'overwrite', index: k, value: R[j] });
      a[k++] = R[j++];
    }
  }

  mergeSort(a, 0, a.length - 1);
  return animations;
}

export function getQuickSortAnimations(arr) {
  const animations = [];
  const a = [...arr];

  function quickSort(a, lo, hi) {
    if (lo < hi) {
      const p = partition(a, lo, hi);
      quickSort(a, lo, p - 1);
      quickSort(a, p + 1, hi);
    }
  }

  function partition(a, lo, hi) {
    const pivot = a[hi];
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      animations.push({ type: 'compare', indices: [j, hi] });
      if (a[j] <= pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        animations.push({ type: 'swap', indices: [i, j] });
      }
    }
    [a[i + 1], a[hi]] = [a[hi], a[i + 1]];
    animations.push({ type: 'swap', indices: [i + 1, hi] });
    return i + 1;
  }

  quickSort(a, 0, a.length - 1);
  return animations;
}
