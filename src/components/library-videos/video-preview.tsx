import { useRef, useEffect, type FC } from 'react';
import ReactPlayer from 'react-player';
import { gsap } from 'gsap';
import styles from './video-preview.module.scss';

interface IProps {
  title: string;
  subtitle: string;
  src: string;
  isPlaying?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
}

const VideoPreview: FC<IProps> = ({
  title,
  subtitle,
  src,
  isPlaying = false,
  onPlay,
  onPause,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const player = playerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    if (!container || !player || !title || !subtitle) return;

    // Initial setup
    gsap.set([title, subtitle], { opacity: 0, y: 20 });

    // Entry animation
    const tl = gsap.timeline({ delay: 0.5 });
    tl.to(title, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });
    tl.to(
      subtitle,
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    );

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(player, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
        boxShadow: '0 25px 80px rgba(0, 255, 100, 0.3)',
      });
      gsap.to([title, subtitle], {
        y: -5,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(player, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
        boxShadow: '0 15px 40px rgba(0, 255, 100, 0.2)',
      });
      gsap.to([title, subtitle], {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handlePlayClick = () => {
    if (isPlaying) {
      onPause?.();
    } else {
      onPlay?.();
    }
  };

  return (
    <div ref={containerRef} className={styles.videoPreview}>
      <div ref={playerRef} className={styles.playerContainer}>
        {/* Video Player */}
        <div className={styles.videoPlayer}>
          <ReactPlayer
            src={src}
            width='100%'
            height='100%'
            controls={true}
            playing={isPlaying}
            onPlay={() => onPlay?.()}
            onPause={() => onPause?.()}
            config={{
              youtube: {
                rel: 0,
                iv_load_policy: 3,
                cc_load_policy: 1,
                disablekb: 1,
                enablejsapi: 1,
              },
            }}
          />
        </div>

        {/* Overlay with title and subtitle */}
        {!isPlaying && (
          <div className={styles.overlay}>
            <div className={styles.content}>
              <h2 ref={titleRef} className={styles.title}>
                {title}
              </h2>
              <p ref={subtitleRef} className={styles.subtitle}>
                {subtitle}
              </p>

              <div className={styles.playButton} onClick={handlePlayClick}>
                <div className={styles.playIcon}>
                  <svg viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M8 5v14l11-7z' />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animated background elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
        <div className={styles.circle4}></div>
      </div>
    </div>
  );
};

export default VideoPreview;
