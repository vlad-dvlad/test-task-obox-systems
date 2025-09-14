import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import Quote from '../../components/quote/quote';
import BackToHomeButton from '../../shared/back-to-home-button/back-to-home-button';
import { quotes } from './config';
import styles from './inspiration-garden.module.scss';

const InspirationGarden = () => {
  const location = useLocation();
  const quoteRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleQuotes, setVisibleQuotes] = useState<Set<number>>(new Set());

  // Reset scroll position when component mounts or route changes
  useEffect(() => {
    // Use setTimeout to ensure DOM is fully loaded
    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Reset immediately and after a short delay
    resetScroll();
    const timeoutId = setTimeout(resetScroll, 100);

    setScrollProgress(0);
    setVisibleQuotes(new Set());

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  // Additional scroll reset after component is fully mounted
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
            setVisibleQuotes(prev => new Set([...prev, index]));
          } else {
            entry.target.classList.remove(styles.visible);
            setVisibleQuotes(prev => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    quoteRefs.current.forEach(ref => {
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
      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ height: `${scrollProgress * 100}%` }}
        />
        <div className={styles.progressDots}>
          {quotes.map((_, index) => (
            <div
              key={index}
              className={`${styles.progressDot} ${
                visibleQuotes.has(index) ? styles.active : ''
              }`}
            />
          ))}
        </div>
      </div>

      <BackToHomeButton />

      {/* Quotes */}
      {quotes.map((quote, index) => (
        <div key={quote.title} className={styles.quoteSection}>
          <div
            ref={el => {
              quoteRefs.current[index] = el;
            }}
            data-index={index}
            className={styles.quoteWrapper}
          >
            <Quote {...quote} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default InspirationGarden;
