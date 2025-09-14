import { useEffect, useState } from 'react';
import styles from './global-loader.module.scss';

interface GlobalLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

const GlobalLoader = ({ isLoading, onComplete }: GlobalLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 500);
    }
  }, [isLoading, onComplete]);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.globalLoader} ${!isLoading ? styles.completed : ''}`}
    >
      <div className={styles.loaderContent}>
        <div className={styles.logo}>
          <div className={styles.logoText}>HALL OF ZERO LIMITS</div>
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={styles.progressText}>{Math.round(progress)}%</div>
        </div>

        <div className={styles.loadingText}>
          {progress < 30 && 'Initializing...'}
          {progress >= 30 && progress < 60 && 'Loading assets...'}
          {progress >= 60 && progress < 90 && 'Preparing experience...'}
          {progress >= 90 && 'Almost ready...'}
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;
