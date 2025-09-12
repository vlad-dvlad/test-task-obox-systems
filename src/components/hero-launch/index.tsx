import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useEffect, useRef } from 'react';
import styles from './hero-launch.module.scss';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HeroLaunch = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && overlayRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -100,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(overlayRef.current, {
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.heroLaunch}>
      <video
        className={styles.video}
        autoPlay
        loop
        muted
        playsInline
        preload='auto'
      >
        <source src='/bg-video.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      <div ref={overlayRef} className={styles.overlay}></div>

      <div className={styles.textContainer}>
        <h1 className={styles.neonText}>The HALL OF ZERO LIMITS</h1>
      </div>
    </div>
  );
};

export default HeroLaunch;
