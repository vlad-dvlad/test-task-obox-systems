import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import HintModal from '../../shared/hint/hint-modal';
import styles from './main-section.module.scss';
import CinematicButton from '../../shared/cinematic-button/cinematic-button';

gsap.registerPlugin(ScrollTrigger);

const MainSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <div className={styles.buttonGroup}>
            <CinematicButton
              variant='primary'
              onClick={() => setIsModalOpen(true)}
            >
              <span className={styles.hintText}>Show Hints</span>
            </CinematicButton>
            <CinematicButton
              variant='secondary'
              onClick={() => setIsModalOpen(true)}
            >
              <span className={styles.menuText}>Show Menu</span>
            </CinematicButton>
          </div>
        </div>
      </div>
      <HintModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default MainSection;
