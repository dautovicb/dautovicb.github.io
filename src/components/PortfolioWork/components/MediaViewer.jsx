import useZoomPan from "../hooks/useZoomPan";
import { clamp, pad2 } from "../utils";

export default function MediaViewer({ items, index, projectName, onNavigate, onClose }) {
  const item = items[index];
  const total = items.length;
  const canZoom = item.type !== "video";

  const {
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
  } = useZoomPan({ item, index, total, canZoom, onNavigate, onClose });

  const swipeDrag = transform.scale <= 1.001 ? Math.max(Math.abs(transform.tx), transform.ty) : 0;
  const dragOpacity = swipeDrag > 0 ? clamp(1 - swipeDrag / 480, 0.45, 1) : 1;

  const assetClassName = [
    "mg-media-viewer-asset",
    item.type === "video" ? "mg-media-viewer-asset-video" : "mg-media-viewer-asset-image",
    canZoom && transform.scale <= 1.001 ? "mg-media-viewer-asset-zoomable" : "",
    canZoom && transform.scale > 1.001 ? (isPanningNow ? "mg-media-viewer-asset-grabbing" : "mg-media-viewer-asset-grab") : "",
    isAnimating ? "mg-media-viewer-asset-animate" : "",
  ].filter(Boolean).join(" ");

  return (
    <div
      className="mg-media-viewer"
      role="dialog"
      aria-modal="true"
      aria-label={`${projectName} media viewer, ${index + 1} of ${total}`}
      onClick={onClose}
    >
      <div className="mg-media-viewer-frame" onClick={(e) => e.stopPropagation()}>
        <div className="mg-media-viewer-bar">
          <span className="mg-media-viewer-label">{projectName}</span>
          <div className="mg-media-viewer-bar-actions">
            {transform.scale > 1.01 && (
              <button type="button" className="mg-media-viewer-zoom-reset" onClick={resetZoom}>
                {Math.round(transform.scale * 100)}% · reset
              </button>
            )}
            {total > 1 && (
              <span className="mg-media-viewer-counter">
                {pad2(index + 1)}/{pad2(total)}
              </span>
            )}
            <button type="button" className="mg-media-viewer-close" onClick={onClose} aria-label="Close media viewer">
              close ×
            </button>
          </div>
        </div>

        <div
          className={`mg-media-viewer-stage${canZoom ? " mg-media-viewer-stage-locked" : ""}`}
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endGesture}
          onPointerCancel={endGesture}
        >
          {item.type === "video" ? (
            <video
              src={item.src}
              controls
              autoPlay
              playsInline
              className={assetClassName}
            />
          ) : (
            <img
              src={item.src}
              alt={`${projectName} — image ${index + 1} of ${total}`}
              draggable={false}
              onLoad={handleAssetLoad}
              className={assetClassName}
              style={{ transform: `translate(${transform.tx}px, ${transform.ty}px) scale(${transform.scale})`, opacity: dragOpacity }}
            />
          )}

          {total > 1 && (
            <>
              <button
                type="button"
                className="mg-media-nav mg-media-nav-prev"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => navigate(-1)}
                aria-label="Previous media"
              >
                ‹
              </button>
              <button
                type="button"
                className="mg-media-nav mg-media-nav-next"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => navigate(1)}
                aria-label="Next media"
              >
                ›
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
