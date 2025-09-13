import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import Quote from '../shared/quote/quote';
import { quotes } from './config';
import styles from './inspiration-garden.module.scss';

const InspirationGarden = () => {
  const navigate = useNavigate();
  const quoteRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleQuotes, setVisibleQuotes] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = rect.height;

      // Calculate scroll progress
      const scrolled = Math.abs(rect.top);
      const maxScroll = containerHeight - windowHeight;
      const progress = Math.min(1, Math.max(0, scrolled / maxScroll));
      setScrollProgress(progress);
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

  const handleBackToHome = () => {
    navigate('/');
  };

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

      {/* Back to Home Button */}
      <button className={styles.backButton} onClick={handleBackToHome}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className={styles.backIcon}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
          />
        </svg>
        <span>Back to Home</span>
      </button>

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
