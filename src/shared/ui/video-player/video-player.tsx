import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from 'media-chrome/react';
import styles from './video-player.module.scss';

interface VideoPlayerProps {
  src?: string;
  title?: string;
  className?: string;
}

// Helper function to convert YouTube URL to embed URL
const getYouTubeEmbedUrl = (url: string): string | null => {
  const youtubeRegex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(youtubeRegex);

  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return null;
};

// Helper function to check if URL is a YouTube URL
const isYouTubeUrl = (url: string): boolean => {
  return url.includes('youtube.com') || url.includes('youtu.be');
};

const VideoPlayer = ({
  src = 'https://youtu.be/HM39r8qIKt8?si=7DQSSnpGnJuNWLvJ',
  title = 'Video Player',
  className = '',
}: VideoPlayerProps) => {
  const isYouTube = isYouTubeUrl(src);
  const embedUrl = isYouTube ? getYouTubeEmbedUrl(src) : null;

  if (isYouTube && embedUrl) {
    return (
      <div className={`${styles.videoPlayerContainer} ${className}`}>
        <iframe
          src={embedUrl}
          title={title}
          className={styles.iframe}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={`${styles.videoPlayerContainer} ${className}`}>
      <MediaController className={styles.mediaController}>
        <video
          slot='media'
          src={src}
          title={title}
          preload='metadata'
          className={styles.video}
        />
        <MediaControlBar>
          <MediaPlayButton />
          <MediaSeekBackwardButton seekOffset={10} />
          <MediaSeekForwardButton seekOffset={10} />
          <MediaTimeRange />
          <MediaTimeDisplay showDuration />
          <MediaMuteButton />
          <MediaVolumeRange />
          <MediaPlaybackRateButton />
          <MediaFullscreenButton />
        </MediaControlBar>
      </MediaController>
    </div>
  );
};

export default VideoPlayer;
