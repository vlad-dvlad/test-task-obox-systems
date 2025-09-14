import { useEffect, useRef, useState, type FC } from 'react';
import VideoPreview from '../../components/library-videos/video-preview';
import BackToHomeButton from '../../shared/back-to-home-button/back-to-home-button';
import styles from './video-gallery.module.scss';
import { useLocation } from 'react-router';

type videoData = {
  title: string;
  subtitle: string;
  src: string;
};

interface IProps {
  items: videoData[];
}

const VideoGallery: FC<IProps> = ({ items }) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleVideos, setVisibleVideos] = useState<Set<number>>(new Set());

  useEffect(() => {
    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    resetScroll();
    const timeoutId = setTimeout(resetScroll, 100);

    setScrollProgress(0);
    setVisibleVideos(new Set());

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  useEffect(() => {
    const checkAndResetScroll = () => {
      if (window.pageYOffset > 0 || document.documentElement.scrollTop > 0) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    };

    // Check after a longer delay to ensure everything is loaded
    const timeoutId = setTimeout(checkAndResetScroll, 200);

    return () => clearTimeout(timeoutId);
  }, []);

  // Prevent scroll restoration on page load
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }

          const windowHeight = window.innerHeight;

          // Calculate progress based on scroll position
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
          const documentHeight =
            document.documentElement.scrollHeight - windowHeight;

          let progress = 0;

          if (documentHeight > 0) {
            progress = scrollTop / documentHeight;
          }

          setScrollProgress(Math.min(1, Math.max(0, progress)));
          ticking = false;
        });
        ticking = true;
      }
    };

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const index = parseInt(
            entry.target.getAttribute('data-index') || '0'
          );

          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            setVisibleVideos(prev => new Set([...prev, index]));
          } else {
            entry.target.classList.remove(styles.visible);
            setVisibleVideos(prev => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    videoRefs.current?.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ height: `${scrollProgress * 100}%` }}
        />
        <div className={styles.progressDots}>
          {items.map((_, index) => (
            <div
              key={index}
              className={`${styles.progressDot} ${
                visibleVideos.has(index) ? styles.active : ''
              }`}
            />
          ))}
        </div>
      </div>

      <BackToHomeButton />
      {items.map((video, index) => (
        <div key={video.title} className={styles.videoSection}>
          <div
            ref={el => {
              if (videoRefs.current) {
                videoRefs.current[index] = el;
              }
            }}
            data-index={index}
            style={{ width: '100%' }}
            className={styles.videoWrapper}
          >
            <VideoPreview {...video} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;
