import { useEffect, useRef, type FC } from 'react';
import styles from './modal.module.scss';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  className?: string;
}

const Modal: FC<IProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  className = '',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Lock scroll when modal opens and maintain scroll position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      if (modalRef.current) {
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
    } else {
      // Restore scroll position and unlock scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';

      // Restore the scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup function to ensure scroll is restored when component unmounts
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={modalRef}
        className={styles.modal}
        onClick={e => e.stopPropagation()}
      >
        <div className={`${styles.card} ${className}`}>
          <div className={styles.cardHeader}>
            {showCloseButton && (
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
            )}
          </div>

          <div className={styles.cardBody}>
            <div className={styles.content}>
              <div className={styles.textContainer}>
                <h3 className={styles.modalTitle} data-text={title}>
                  {title}
                </h3>
              </div>
              <div className={styles.modalContent}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
