import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
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

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

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
  }, [isVideoLoaded]);

  return (
    <section ref={sectionRef} className={styles.mainSection}>
      <div ref={bgRef} className={styles.bg}></div>
      <video
        ref={videoRef}
        className={`${styles.video} ${isVideoLoaded ? styles.videoLoaded : styles.videoLoading}`}
        autoPlay={isVideoLoaded}
        loop
        muted
        playsInline
        preload='metadata'
        poster='/bg-video-poster.jpg'
      >
        <source src='/bg-video-optimized.mp4' type='video/mp4' />
        <source src='/bg-video.mp4' type='video/mp4' />
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
