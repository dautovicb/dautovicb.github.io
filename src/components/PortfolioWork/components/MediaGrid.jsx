import MediaPlayOverlay from "./MediaPlayOverlay";
import PreviewVideo from "./PreviewVideo";

export default function MediaGrid({ items, viewableMedia, projectName, onView }) {
  if (items.length === 0) return null;
  return (
    <div className="mg-media-grid">
      {items.map((item, i) => {
        const viewIndex = viewableMedia.indexOf(item);
        return (
          <button
            key={i}
            type="button"
            className="mg-media-cell"
            onClick={() => onView(viewIndex)}
            aria-label={`View ${item.type === "video" ? "video" : "image"} ${viewIndex + 1} of ${viewableMedia.length}`}
          >
            {item.type === "video" ? (
              <>
                <PreviewVideo src={item.src} className="mg-media-asset mg-media-asset-cover mg-media-asset-video" />
                <MediaPlayOverlay />
              </>
            ) : (
              <img src={item.src} alt={`${projectName} detail ${i + 1}`} className="mg-media-asset mg-media-asset-cover mg-media-asset-image" />
            )}
          </button>
        );
      })}
    </div>
  );
}
