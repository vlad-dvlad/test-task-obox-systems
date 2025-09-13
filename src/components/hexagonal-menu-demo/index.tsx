import React from 'react';
import HexagonalMenu from '../hexagonal-menu';
import styles from './hexagonal-menu-demo.module.scss';
import type { HexagonalMenuItem } from '../hexagonal-menu/types';

const HexagonalMenuDemo: React.FC = () => {
  const menuItems: HexagonalMenuItem[] = [
    {
      id: 'welcome',
      title: 'Welcome',
      icon: 'fa fa-universal-access',
      onClick: () => console.log('Welcome clicked'),
    },
    {
      id: 'about',
      title: 'About',
      icon: 'fa fa-bullseye',
      onClick: () => console.log('About clicked'),
    },
    {
      id: 'services',
      title: 'Services',
      icon: 'fa fa-braille',
      onClick: () => console.log('Services clicked'),
    },
    {
      id: 'resume',
      title: 'Resume',
      icon: 'fa fa-id-badge',
      onClick: () => console.log('Resume clicked'),
    },
    {
      id: 'works',
      title: 'Works',
      icon: 'fa fa-life-ring',
      onClick: () => console.log('Works clicked'),
    },
    {
      id: 'testimonials',
      title: 'Testimonials',
      icon: 'fa fa-clipboard',
      onClick: () => console.log('Testimonials clicked'),
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: 'fa fa-map-signs',
      onClick: () => console.log('Contact clicked'),
    },
  ];

  return (
    <div className={styles.demoContainer}>
      <div className={styles.pageTitle}>
        <span className={styles.headingPage}>Welcome to My Page</span>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
      </div>

      <HexagonalMenu items={menuItems} className={styles.hexMenu} />
    </div>
  );
};

export default HexagonalMenuDemo;
