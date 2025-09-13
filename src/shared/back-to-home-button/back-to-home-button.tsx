import { useNavigate } from 'react-router';
import styles from './back-to-home-button.module.scss';
import { RoutesE } from '../../routes';

const BackToHomeButton = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate(RoutesE.HOME);
  };

  return (
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
  );
};

export default BackToHomeButton;
