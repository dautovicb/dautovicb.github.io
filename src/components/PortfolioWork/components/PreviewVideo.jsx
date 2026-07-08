import { useEffect, useRef } from "react";

/**
 * A muted, looping preview clip that only plays while it is on screen. Off-screen
 * clips are paused so bandwidth goes to what the visitor can actually see. Without
 * this, several large autoplaying videos download at once, play for a moment and
 * then stall competing for the connection.
 */
export default function PreviewVideo({ src, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const play = () => video.play().catch(() => {});

    if (!("IntersectionObserver" in window)) {
      play();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else video.pause();
      },
      { threshold: 0.2 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      muted
      playsInline
      loop
      preload="metadata"
      className={className}
    />
  );
}
