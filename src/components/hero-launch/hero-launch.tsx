import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import styles from './hero-launch.module.scss';

gsap.registerPlugin(ScrollTrigger);

const HeroLaunch = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollButtonRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Video loading handler
  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  // Preload video when component mounts
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadeddata', handleVideoLoad);
      // Start preloading
      video.load();
    }

    return () => {
      if (video) {
        video.removeEventListener('loadeddata', handleVideoLoad);
      }
    };
  }, []);

  // GSAP animations - only start when video is loaded
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
        autoPlay={isVideoLoaded}
        loop
        muted
        playsInline
        preload='metadata'
        poster='/initial-bg-poster.jpg'
      >
        <source
          src='/initial-bg-h265.mp4'
          type='video/mp4; codecs="hev1.1.6.L93.B0"'
        />
        <source src='/initial-bg.webm' type='video/webm' />
        <source src='/initial-bg-1080p.mp4' type='video/mp4' />
        <source src='/initial-bg-optimized.mp4' type='video/mp4' />
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
