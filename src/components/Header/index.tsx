import React from 'react';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <h1>NASA Media Library</h1>
      </div>
    </div>
  )
}

export default Header;