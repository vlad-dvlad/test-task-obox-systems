import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HintModal, CinematicButton } from '../../shared';
import styles from './main-section.module.scss';
import { HexagonalMenu } from '../';
gsap.registerPlugin(ScrollTrigger);

const MainSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.warn('Video failed to load, using fallback');
    setIsVideoLoaded(true);
  };

  const handleUserInteraction = useCallback(async () => {
    if (!userInteracted && videoRef.current) {
      setUserInteracted(true);
      try {
        await videoRef.current.play();
      } catch (error) {
        console.warn('Failed to play video after user interaction:', error);
      }
    }
  }, [userInteracted]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      video.autoplay = true;
      video.preload = 'auto';

      const events = ['loadeddata', 'canplay', 'canplaythrough'];
      events.forEach(event => {
        video.addEventListener(event, handleVideoLoad, { once: true });
      });

      video.addEventListener('error', handleVideoError, { once: true });

      video.load();

      const playVideo = async () => {
        try {
          await video.play();
        } catch (error) {
          console.warn('Autoplay failed:', error);
          setIsVideoLoaded(true);
        }
      };

      setTimeout(playVideo, 100);
    }

    const interactionEvents = ['click', 'touchstart', 'keydown'];
    interactionEvents.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      interactionEvents.forEach((event: string) => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [userInteracted, handleUserInteraction]);

  useEffect(() => {
    if (
      isVideoLoaded &&
      sectionRef.current &&
      bgRef.current &&
      videoRef.current
    ) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
          start: 'top bottom',
          end: 'bottom top',
          markers: false,
        },
      });

      tl.fromTo(
        sectionRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: 'power2.out',
        }
      ).to(
        videoRef.current,
        {
          y: -30,
          scale: 1.05,
          duration: 4,
          ease: 'none',
        },
        '-=2'
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isVideoLoaded]);

  return (
    <section ref={sectionRef} className={styles.mainSection}>
      <div ref={bgRef} className={styles.bg}></div>
      <video
        ref={videoRef}
        className={`${styles.video} ${isVideoLoaded ? styles.videoLoaded : styles.videoLoading}`}
        autoPlay
        loop
        muted
        playsInline
        preload='auto'
        poster='/bg-video-poster.jpg'
        crossOrigin='anonymous'
        webkit-playsinline='true'
        x5-playsinline='true'
        x5-video-player-type='h5'
        x5-video-player-fullscreen='true'
      >
        <source
          src='/bg-video-optimized.mp4'
          type='video/mp4; codecs="avc1.42E01E"'
          media='(min-width: 1024px)'
        />
        <source
          src='/bg-video.mp4'
          type='video/mp4'
          media='(max-width: 1023px)'
        />
        <source src='/bg-video-optimized.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.contentWrapper}>
          <div className={styles.buttonGroup}>
            <CinematicButton
              variant='primary'
              onClick={() => {
                scrollToBottom();
                setTimeout(() => setIsModalOpen(true), 500);
              }}
            >
              <span className={styles.hintText}>Show Hints</span>
            </CinematicButton>
            <CinematicButton
              variant='secondary'
              onClick={() => {
                scrollToBottom();
                setTimeout(() => setIsQuoteOpen(true), 500);
              }}
            >
              <span className={styles.menuText}>Show Menu</span>
            </CinematicButton>
          </div>
        </div>
      </div>
      <HintModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <HexagonalMenu
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />
    </section>
  );
};

export default MainSection;
