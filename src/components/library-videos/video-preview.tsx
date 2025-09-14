import { useRef, useEffect, useState, type FC } from 'react';
import ReactPlayer from 'react-player';
import { gsap } from 'gsap';
import styles from './video-preview.module.scss';

interface IProps {
  title: string;
  subtitle: string;
  src: string;
}

const VideoPreview: FC<IProps> = ({ title, subtitle, src }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const playButtonRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const player = playerRef.current;
    const overlay = overlayRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const playButton = playButtonRef.current;

    if (!container || !player || !overlay || !title || !subtitle || !playButton)
      return;

    // Initial setup
    gsap.set([title, subtitle, playButton], { opacity: 0, y: 20 });
    gsap.set(overlay, { opacity: 0.8 });

    // Entry animation
    const tl = gsap.timeline({ delay: 0.5 });
    tl.to(title, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
      .to(
        subtitle,
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .to(
        playButton,
        { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.3'
      );

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(player, {
        scale: 1.08,
        rotation: 2,
        duration: 0.8,
        ease: 'power2.out',
        boxShadow: '0 25px 80px rgba(0, 255, 100, 0.3)',
      });
      gsap.to(overlay, {
        opacity: 0.3,
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to([title, subtitle], {
        y: -15,
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(playButton, {
        scale: 1.2,
        rotation: 5,
        duration: 0.4,
        ease: 'back.out(1.7)',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(player, {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'power2.out',
        boxShadow: '0 15px 40px rgba(0, 255, 100, 0.2)',
      });
      gsap.to(overlay, {
        opacity: 0.8,
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to([title, subtitle], {
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(playButton, {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: 'back.out(1.7)',
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
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div ref={containerRef} className={styles.videoPreview}>
        <div ref={playerRef} className={styles.playerContainer}>
          {/* Video thumbnail/preview without controls */}
          <div className={styles.videoThumbnail}>
            <div className={styles.videoPlaceholder}></div>
          </div>

          <div ref={overlayRef} className={styles.overlay}>
            <div className={styles.content}>
              <h2 ref={titleRef} className={styles.title}>
                {title}
              </h2>
              <p ref={subtitleRef} className={styles.subtitle}>
                {subtitle}
              </p>

              <div
                ref={playButtonRef}
                className={styles.playButton}
                onClick={handlePlayClick}
              >
                <div className={styles.playIcon}>
                  <svg viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M8 5v14l11-7z' />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className={styles.backgroundElements}>
          <div className={styles.circle1}></div>
          <div className={styles.circle2}></div>
          <div className={styles.circle3}></div>
          <div className={styles.circle4}></div>
        </div>
      </div>

      {/* Modal for video playback */}
      {isModalOpen && (
        <div className={styles.modal} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={e => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={handleCloseModal}>
              <svg viewBox='0 0 24 24' fill='currentColor'>
                <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
              </svg>
            </button>
            <div className={styles.videoPlayer}>
              <ReactPlayer
                src={src}
                width='100%'
                height='100%'
                controls={true}
                playing={true}
                config={{
                  youtube: {},
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPreview;
