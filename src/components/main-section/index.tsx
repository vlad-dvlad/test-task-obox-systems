import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import styles from './main-section.module.scss';

gsap.registerPlugin(ScrollTrigger);

const MainSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (sectionRef.current && bgRef.current && videoRef.current) {
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
      )
        // Animate video parallax
        .to(
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
  }, []);

  return (
    <section ref={sectionRef} className={styles.mainSection}>
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
        <source src='/bg-video.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.title}>Welcome to the Future</h2>
          <p className={styles.description}>
            Experience the next generation of technology with our innovative
            solutions. Discover unlimited possibilities and transform your
            digital world.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
