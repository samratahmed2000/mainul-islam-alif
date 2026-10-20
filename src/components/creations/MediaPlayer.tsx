import type { CreationMedia } from "@/types/creation";

interface MediaPlayerProps {
  readonly media: CreationMedia;
  readonly title: string;
}

function getYouTubeEmbedUrl(source: string): string | undefined {
  try {
    const url = new URL(source);
    const host = url.hostname.toLowerCase();
    const isYouTubeHost =
      host === "youtube.com" ||
      host.endsWith(".youtube.com") ||
      host === "youtu.be";

    if (
      !isYouTubeHost ||
      (url.protocol !== "https:" && url.protocol !== "http:")
    ) {
      return undefined;
    }

    const videoId =
      host === "youtu.be"
        ? url.pathname.split("/").filter(Boolean)[0]
        : url.searchParams.get("v") ??
          url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1];

    if (!videoId || !/^[\w-]{11}$/.test(videoId)) {
      return undefined;
    }

    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  } catch {
    return undefined;
  }
}

function getAudioSource(source: string): string | undefined {
  const value = source.trim();
  if (value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }

  try {
    const url = new URL(value);
    if (url.protocol === "https:" || url.protocol === "http:") {
      return url.toString();
    }
  } catch {
    return undefined;
  }

  return undefined;
}

export default function MediaPlayer({ media, title }: MediaPlayerProps) {
  const videoUrl = getYouTubeEmbedUrl(media.youtubeUrl);
  const audioSource = getAudioSource(media.audioUrl);

  if (!videoUrl && !audioSource) {
    return null;
  }

  return (
    <section className="creation-media" aria-labelledby="media-heading">
      <h2 id="media-heading" className="section-heading">
        শুনুন বা দেখুন
      </h2>
      {videoUrl && (
        <div className="creation-video-frame">
          <iframe
            src={videoUrl}
            title={`${title} — YouTube ভিডিও`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )}
      {audioSource && (
        <audio
          className="creation-audio"
          controls
          preload="none"
          src={audioSource}
          aria-label={`${title} — অডিও প্লেয়ার`}
        >
          আপনার ব্রাউজার অডিও প্লেয়ার সমর্থন করে না।
        </audio>
      )}
      {media.previewText.trim() &&
        !media.previewText.includes("যোগ করুন") && (
          <p className="creation-media-caption">{media.previewText}</p>
        )}
    </section>
  );
}
