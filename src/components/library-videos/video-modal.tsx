import { useEffect, useRef, type FC } from 'react';
import ReactPlayer from 'react-player';
import styles from './video-modal.module.scss';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  src: string;
}

const VideoModal: FC<IProps> = ({ isOpen, onClose, title, src }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Lock scroll when modal opens
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      if (modalRef.current) {
        // Add entrance animation
        modalRef.current.style.opacity = '0';
        modalRef.current.style.transform = 'scale(0.9)';

        setTimeout(() => {
          if (modalRef.current) {
            modalRef.current.style.opacity = '1';
            modalRef.current.style.transform = 'scale(1)';
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
      document.documentElement.style.overflow = '';

      // Restore the scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup function
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={modalRef}
        className={styles.modal}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='18' y1='6' x2='6' y2='18'></line>
              <line x1='6' y1='6' x2='18' y2='18'></line>
            </svg>
          </button>
        </div>

        <div className={styles.videoContainer}>
          <ReactPlayer
            src={src}
            width='100%'
            height='100%'
            controls={true}
            playing={true}
            config={{
              youtube: {
                rel: 0,
                iv_load_policy: 3,
                cc_load_policy: 1,
                disablekb: 1,
                enablejsapi: 1,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
