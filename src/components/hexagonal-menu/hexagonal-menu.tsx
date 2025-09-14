import React from 'react';
import styles from './hexagonal-menu.module.scss';
import { hexagonalMenuItems } from './config';
import { Link } from 'react-router';
import { Modal } from '../../shared';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const HexagonalMenu: React.FC<IProps> = ({
  isOpen,
  onClose,
  className = '',
}) => {
  return (
    <Modal
      title='Hexagonal Menu'
      isOpen={isOpen}
      onClose={onClose}
      className={styles.menu}
    >
      <div style={{ width: '100%', height: '100%' }}>
        <div className={`${styles.hexagonMenu} ${className}`}>
          {hexagonalMenuItems.map(item => (
            <div key={item.id} className={styles.hexagonItem}>
              <div className={styles.hexItem}>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={styles.hexItem}>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <Link className={styles.hexContent} to={item.id}>
                <span className={styles.hexContentInner}>
                  <span className={styles.icon}>
                    <i className={item.icon}></i>
                  </span>
                  <span className={styles.title}>{item.title}</span>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default HexagonalMenu;
