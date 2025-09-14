import styles from './loading-spinner.module.scss';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
  fullScreen?: boolean;
}

const LoadingSpinner = ({
  text = 'Loading experience...',
  size = 'medium',
  variant = 'primary',
  fullScreen = false,
}: LoadingSpinnerProps) => {
  return (
    <div
      className={`${styles.loadingContainer} ${styles[variant]} ${fullScreen ? styles.fullScreen : ''}`}
    >
      <div className={`${styles.loadingSpinner} ${styles[size]}`}></div>
      {text && <p className={styles.loadingText}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
