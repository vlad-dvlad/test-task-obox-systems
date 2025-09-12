import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import styles from './hero-launch.module.scss';

gsap.registerPlugin(ScrollTrigger);

const HeroLaunch = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
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
  }, []);

  return (
    <section ref={sectionRef} className={styles.heroSection}>
      <div ref={bgRef} className={styles.bg}></div>

      <video
        ref={videoRef}
        className={styles.video}
        autoPlay
        loop
        muted
        playsInline
        preload='auto'
      >
        <source src='/initial-bg.mp4' type='video/mp4' />
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
