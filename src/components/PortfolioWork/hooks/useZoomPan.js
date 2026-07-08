import { useState, useEffect, useRef } from "react";
import {
  MIN_SCALE,
  MAX_SCALE,
  DOUBLE_TAP_SCALE,
  SWIPE_THRESHOLD_PX,
  DISMISS_THRESHOLD_PX,
  TAP_MAX_INTERVAL_MS,
  TAP_MAX_DISTANCE_PX,
  MOVE_COMMIT_THRESHOLD_PX,
} from "../constants";
import { clamp, anchoredZoom } from "../utils";

/**
 * Drives the media viewer's zoom / pan / pinch / swipe gestures for a single
 * item. Owns the transform state and all pointer, wheel and keyboard handling;
 * navigation and dismissal are delegated to `onNavigate` / `onClose`.
 *
 * Returns the stage ref, current transform, transient interaction flags and the
 * handlers the presentational viewer wires up.
 */
export default function useZoomPan({ item, index, total, canZoom, onNavigate, onClose }) {
  const [transform, setTransform] = useState({ scale: 1, tx: 0, ty: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPanningNow, setIsPanningNow] = useState(false);
  const [naturalSize, setNaturalSize] = useState(null);

  const stageRef = useRef(null);
  const gestureRef = useRef(null);
  const pointersRef = useRef(new Map());
  const lastTapRef = useRef({ time: 0, x: 0, y: 0 });
  const animTimeoutRef = useRef(null);

  useEffect(() => {
    setTransform({ scale: 1, tx: 0, ty: 0 });
    setNaturalSize(null);
    setIsAnimating(false);
    pointersRef.current.clear();
    gestureRef.current = null;
  }, [index]);

  useEffect(() => () => window.clearTimeout(animTimeoutRef.current), []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); navigate(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); navigate(-1); }
      else if (canZoom && (e.key === "+" || e.key === "=")) { e.preventDefault(); zoomBy(1.5); }
      else if (canZoom && e.key === "-") { e.preventDefault(); zoomBy(1 / 1.5); }
      else if (canZoom && e.key === "0") { e.preventDefault(); resetZoom(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, total, canZoom, naturalSize]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !canZoom) return;
    const onWheel = (e) => {
      e.preventDefault();
      const box = stage.getBoundingClientRect();
      const anchorX = e.clientX - (box.left + box.width / 2);
      const anchorY = e.clientY - (box.top + box.height / 2);
      const factor = Math.exp(-e.deltaY * 0.0016);
      setTransform((t) => {
        const nextScale = clamp(t.scale * factor, MIN_SCALE, MAX_SCALE);
        return anchoredZoom(t, nextScale, anchorX, anchorY, getPanBounds(nextScale));
      });
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [index, canZoom, naturalSize]);

  function getPanBounds(scale) {
    if (!naturalSize || !stageRef.current) return { maxX: 0, maxY: 0 };
    const box = stageRef.current.getBoundingClientRect();
    const fit = Math.min(box.width / naturalSize.w, box.height / naturalSize.h);
    const scaledW = naturalSize.w * fit * scale;
    const scaledH = naturalSize.h * fit * scale;
    return {
      maxX: Math.max(0, (scaledW - box.width) / 2),
      maxY: Math.max(0, (scaledH - box.height) / 2),
    };
  }

  function navigate(dir) {
    if (total <= 1) return;
    onNavigate((index + dir + total) % total);
  }

  function animateTo(next) {
    setIsAnimating(true);
    setTransform(next);
    window.clearTimeout(animTimeoutRef.current);
    animTimeoutRef.current = window.setTimeout(() => setIsAnimating(false), 260);
  }

  function resetZoom() {
    animateTo({ scale: 1, tx: 0, ty: 0 });
  }

  function zoomBy(factor) {
    animateTo(
      anchoredZoom(transform, clamp(transform.scale * factor, MIN_SCALE, MAX_SCALE), 0, 0, getPanBounds(clamp(transform.scale * factor, MIN_SCALE, MAX_SCALE)))
    );
  }

  function toggleZoomAt(clientX, clientY) {
    const box = stageRef.current.getBoundingClientRect();
    const anchorX = clientX - (box.left + box.width / 2);
    const anchorY = clientY - (box.top + box.height / 2);
    if (transform.scale > 1.01) {
      animateTo({ scale: 1, tx: 0, ty: 0 });
    } else {
      animateTo(anchoredZoom(transform, DOUBLE_TAP_SCALE, anchorX, anchorY, getPanBounds(DOUBLE_TAP_SCALE)));
    }
  }

  function handleAssetLoad(e) {
    const el = e.target;
    if (el.naturalWidth && el.naturalHeight) {
      setNaturalSize({ w: el.naturalWidth, h: el.naturalHeight });
    }
  }

  function handlePointerDown(e) {
    if (item.type === "video") return;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    const now = Date.now();
    const isDoubleTap =
      pointersRef.current.size === 1 &&
      now - lastTapRef.current.time < TAP_MAX_INTERVAL_MS &&
      Math.hypot(e.clientX - lastTapRef.current.x, e.clientY - lastTapRef.current.y) < TAP_MAX_DISTANCE_PX;
    lastTapRef.current = { time: now, x: e.clientX, y: e.clientY };

    if (isDoubleTap) {
      pointersRef.current.clear();
      gestureRef.current = null;
      toggleZoomAt(e.clientX, e.clientY);
      return;
    }

    if (pointersRef.current.size === 2) {
      const pts = Array.from(pointersRef.current.values());
      const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
      const box = stageRef.current.getBoundingClientRect();
      gestureRef.current = {
        mode: "pinch",
        startDist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y),
        startScale: transform.scale,
        startTx: transform.tx,
        startTy: transform.ty,
        anchorX: mid.x - (box.left + box.width / 2),
        anchorY: mid.y - (box.top + box.height / 2),
      };
    } else if (pointersRef.current.size === 1) {
      gestureRef.current = {
        mode: transform.scale > 1.01 ? "pan" : "swipe",
        startX: e.clientX,
        startY: e.clientY,
        startTx: transform.tx,
        startTy: transform.ty,
        startScale: transform.scale,
        moved: false,
        horizontal: null,
      };
      if (transform.scale > 1.01) setIsPanningNow(true);
    }
  }

  function handlePointerMove(e) {
    const g = gestureRef.current;
    if (!g || !pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (g.mode === "pinch") {
      if (pointersRef.current.size < 2) return;
      const pts = Array.from(pointersRef.current.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const nextScale = clamp(g.startScale * (dist / g.startDist), MIN_SCALE, MAX_SCALE);
      setTransform(
        anchoredZoom(
          { scale: g.startScale, tx: g.startTx, ty: g.startTy },
          nextScale,
          g.anchorX,
          g.anchorY,
          getPanBounds(nextScale)
        )
      );
      return;
    }

    if (g.mode === "pan") {
      const bounds = getPanBounds(g.startScale);
      setTransform({
        scale: g.startScale,
        tx: clamp(g.startTx + (e.clientX - g.startX), -bounds.maxX, bounds.maxX),
        ty: clamp(g.startTy + (e.clientY - g.startY), -bounds.maxY, bounds.maxY),
      });
      return;
    }

    if (g.mode === "swipe") {
      const dx = e.clientX - g.startX;
      const dy = e.clientY - g.startY;
      if (!g.moved) {
        if (Math.abs(dx) < MOVE_COMMIT_THRESHOLD_PX && Math.abs(dy) < MOVE_COMMIT_THRESHOLD_PX) return;
        g.moved = true;
        g.horizontal = Math.abs(dx) > Math.abs(dy);
      }
      if (g.horizontal) {
        g.lastDx = dx;
        setTransform({ scale: 1, tx: dx, ty: 0 });
      } else {
        g.lastDy = dy;
        setTransform({ scale: 1, tx: 0, ty: Math.max(0, dy) });
      }
    }
  }

  function endGesture(e) {
    const g = gestureRef.current;
    pointersRef.current.delete(e.pointerId);
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
    setIsPanningNow(false);
    if (!g) return;

    if (g.mode === "pinch") {
      if (pointersRef.current.size >= 2) return;
      gestureRef.current = null;
      setTransform((t) => {
        if (t.scale <= 1.001) return { scale: 1, tx: 0, ty: 0 };
        const bounds = getPanBounds(t.scale);
        return { scale: t.scale, tx: clamp(t.tx, -bounds.maxX, bounds.maxX), ty: clamp(t.ty, -bounds.maxY, bounds.maxY) };
      });
      return;
    }

    gestureRef.current = null;

    if (g.mode === "swipe" && g.moved) {
      if (g.horizontal) {
        const dx = g.lastDx || 0;
        if (Math.abs(dx) > SWIPE_THRESHOLD_PX) { navigate(dx < 0 ? 1 : -1); return; }
      } else {
        const dy = g.lastDy || 0;
        if (dy > DISMISS_THRESHOLD_PX) { onClose(); return; }
      }
      animateTo({ scale: 1, tx: 0, ty: 0 });
    }
  }

  return {
    stageRef,
    transform,
    isAnimating,
    isPanningNow,
    navigate,
    resetZoom,
    handleAssetLoad,
    handlePointerDown,
    handlePointerMove,
    endGesture,
  };
}
