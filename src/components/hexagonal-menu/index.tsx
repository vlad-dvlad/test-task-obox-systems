import React from 'react';
import styles from './hexagonal-menu.module.scss';
import type { HexagonalMenuItem } from './types';

interface HexagonalMenuProps {
  items: HexagonalMenuItem[];
  className?: string;
}

const HexagonalMenu: React.FC<HexagonalMenuProps> = ({
  items,
  className = '',
}) => {
  const handleItemClick = (item: HexagonalMenuItem) => {
    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <div className={`${styles.hexagonMenu} ${className}`}>
      {items.map(item => (
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
          <a
            className={styles.hexContent}
            href={item.href}
            onClick={e => {
              if (item.onClick) {
                e.preventDefault();
                handleItemClick(item);
              }
            }}
          >
            <span className={styles.hexContentInner}>
              <span className={styles.icon}>
                <i className={item.icon}></i>
              </span>
              <span className={styles.title}>{item.title}</span>
            </span>
            <svg
              viewBox='0 0 173.20508075688772 200'
              height='200'
              width='174'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z'
                fill='var(--green-12)'
              />
            </svg>
          </a>
        </div>
      ))}
    </div>
  );
};

export default HexagonalMenu;
