import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <h3>NASA Media Library</h3>
        <p>Made by James Ryan</p>
      </div>
    </div>
  )
}

export default Footer;