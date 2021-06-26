import React from 'react';
import { useHistory } from "react-router-dom";
import styles from './index.module.scss';

const Header = () => {

  const history = useHistory();

  const navigateHome = () => {
    history.push('/');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <div className={styles.header__heading} onClick={navigateHome}>
          Easy
            <span className={styles.bold}>Banking</span>
        </div>
        <div className={styles.header__separator} />
        <ul className={styles.header__pages}>
          <li
            className={styles.header__page}
          >
            <a href="#" className={styles.header__page_link}>Banking</a></li>
          <li
            className={styles.header__page}
          >
            <a href="#"className={styles.header__page_link}>Investments</a>
          </li>
          <li
            className={styles.header__page}
          >
            <a href="#" className={styles.header__page_link}>Insurance</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
