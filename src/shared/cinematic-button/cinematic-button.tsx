import { type ReactNode } from 'react';
import styles from './cinematic-button.module.scss';

interface CinematicButtonProps {
  children: ReactNode;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const CinematicButton = ({
  children,
  variant,
  onClick,
  disabled = false,
  className = '',
}: CinematicButtonProps) => {
  return (
    <button
      className={`${styles.cinematicButton} ${styles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={styles.buttonGlow}></span>
      <span className={styles.buttonText}>{children}</span>
      <span className={styles.buttonShine}></span>
    </button>
  );
};

export default CinematicButton;
