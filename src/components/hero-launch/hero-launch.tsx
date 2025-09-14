import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useGlobalLoader } from '../../hooks/useGlobalLoader';
import styles from './hero-launch.module.scss';

gsap.registerPlugin(ScrollTrigger);

const HeroLaunch = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollButtonRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const { stopLoading } = useGlobalLoader(false);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    // Затримка перед приховуванням лоадера для кращого UX
    setTimeout(() => {
      stopLoading();
    }, 500);
  };

  const handleVideoError = () => {
    setIsVideoLoaded(true);
    // Приховуємо лоадер навіть при помилці
    setTimeout(() => {
      stopLoading();
    }, 500);
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
      if (video) {
        const events = ['loadeddata', 'canplay', 'canplaythrough'];
        events.forEach((event: string) => {
          video.removeEventListener(event, handleVideoLoad);
        });
        video.removeEventListener('error', handleVideoError);
      }
      interactionEvents.forEach((event: string) => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [handleUserInteraction]);

  useEffect(() => {
    if (
      isVideoLoaded &&
      sectionRef.current &&
      bgRef.current &&
      videoRef.current &&
      scrollButtonRef.current
    ) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
          pin: true,
          start: 'top top',
          end: '+=100%',
        },
      });

      tl.to(videoRef.current, {
        y: -100,
        scale: 1.1,
        duration: 6,
        ease: 'none',
      })
        .to(
          scrollButtonRef.current,
          {
            opacity: 0,
            y: -50,
            duration: 2,
            ease: 'power2.out',
          },
          '-=4'
        )
        .to(
          '.textContainer',
          {
            y: -200,
            opacity: 0.3,
            duration: 4,
            ease: 'power2.out',
          },
          '-=6'
        );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isVideoLoaded]);

  return (
    <section ref={sectionRef} className={styles.heroSection}>
      <div ref={bgRef} className={styles.bg}></div>

      <video
        ref={videoRef}
        className={`${styles.video} ${isVideoLoaded ? styles.videoLoaded : styles.videoLoading}`}
        autoPlay
        loop
        muted
        playsInline
        preload='auto'
        poster='/initial-bg-poster.jpg'
        crossOrigin='anonymous'
        webkit-playsinline='true'
        x5-playsinline='true'
        x5-video-player-type='h5'
        x5-video-player-fullscreen='true'
      >
        <source
          src='/initial-bg-mobile.mp4'
          type='video/mp4'
          media='(max-width: 768px)'
        />
        <source
          src='/initial-bg-h265.mp4'
          type='video/mp4; codecs="hev1.1.6.L93.B0"'
          media='(min-width: 769px)'
        />
        <source src='/initial-bg-mobile.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      <div className={styles.overlay}></div>
      <div className={styles.blur}></div>

      <div className={styles.textContainer}>
        <h1 className={styles.neonText}>The HALL OF ZERO LIMITS</h1>
        <p className={styles.description} data-text='Explore new paths.'>
          Explore new paths.
        </p>
        <p className={styles.description} data-text='Find your gifts'>
          Find your gifts
        </p>
      </div>
    </section>
  );
};

export default HeroLaunch;
