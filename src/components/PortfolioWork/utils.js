import projects from "./projects";
import { MIN_SCALE } from "./constants";

/** Zero-pad a number to two digits, e.g. 3 -> "03". */
export function pad2(n) {
  return String(n).padStart(2, "0");
}

export function getGalleryColumns() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

/**
 * Reorder filtered projects so a CSS multi-column layout reads left-to-right,
 * top-to-bottom. Each item keeps its original index in the full projects list.
 */
export function reorderForGallery(items, columnCount) {
  const indexed = items.map((proj) => ({ proj, idx: projects.indexOf(proj) }));
  if (columnCount <= 1) return indexed;

  const columns = Array.from({ length: columnCount }, () => []);
  indexed.forEach((item, i) => {
    columns[i % columnCount].push(item);
  });

  return columns.flat();
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Compute a zoom transform that keeps the point under (anchorX, anchorY) fixed
 * as the scale changes, clamping the resulting pan within `bounds`.
 */
export function anchoredZoom(prev, nextScale, anchorX, anchorY, bounds) {
  if (nextScale <= MIN_SCALE + 0.001) return { scale: MIN_SCALE, tx: 0, ty: 0 };
  const r = nextScale / prev.scale;
  const rawTx = anchorX * (1 - r) + prev.tx * r;
  const rawTy = anchorY * (1 - r) + prev.ty * r;
  return {
    scale: nextScale,
    tx: clamp(rawTx, -bounds.maxX, bounds.maxX),
    ty: clamp(rawTy, -bounds.maxY, bounds.maxY),
  };
}
