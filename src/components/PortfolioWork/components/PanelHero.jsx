import MediaPlayOverlay from "./MediaPlayOverlay";
import PreviewVideo from "./PreviewVideo";

export default function PanelHero({ item, projectName, onView }) {
  if (!item?.src) {
    return (
      <div className="mg-panel-thumb">
        <span className="mg-panel-thumb-label">{projectName}</span>
      </div>
    );
  }
  return (
    <button
      type="button"
      className="mg-panel-thumb mg-panel-thumb-media mg-panel-thumb-button"
      onClick={onView}
      aria-label={`View ${item.type === "video" ? "video" : "image"}`}
    >
      {item.type === "video" ? (
        <>
          <PreviewVideo
            src={item.src}
            className="mg-panel-thumb-asset mg-panel-thumb-asset-cover mg-panel-thumb-asset-video"
          />
          <MediaPlayOverlay />
        </>
      ) : (
        <img
          src={item.src}
          alt={projectName}
          className="mg-panel-thumb-asset mg-panel-thumb-asset-cover mg-panel-thumb-asset-image"
        />
      )}
    </button>
  );
}
