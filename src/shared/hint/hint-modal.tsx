import { useEffect, useRef } from 'react';
import styles from './hint-modal.module.scss';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HintModal = ({ isOpen, onClose }: HintModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Add entrance animation
      modalRef.current.style.opacity = '0';
      modalRef.current.style.transform = 'scale(0.8) translateY(50px)';

      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.style.opacity = '1';
          modalRef.current.style.transform = 'scale(1) translateY(0)';
        }
      }, 10);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={modalRef}
        className={styles.modal}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className={styles.close}
              onClick={onClose}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18 18 6M6 6l12 12'
              />
            </svg>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.content}>
              <div className={styles.textContainer}>
                <h3 className={styles.modalTitle} data-text='Wisdom Guide'>
                  Wisdom Guide
                </h3>
              </div>
              <div className={styles.textHint}>
                <span>
                  You have entered the Hall of Zero Limits. Great things lie
                  ahed for all who open themselves to finding their gift.
                </span>
                <span>
                  This is an ever-changing space for creativity and growth.
                  Here, you will find new insights and tools to help inspire
                  you. After all, inspiration is the water every gift needs to
                  grow.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HintModal;
