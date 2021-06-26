import React from 'react';
import styles from './index.module.scss'

const Footer = () => (
  <footer className={styles.footer}>
    <p className={styles.footer__left}>EasyBanking POC web app</p>
    <p className={styles.footer__right}>&copy;Alex Baranova</p>
  </footer>
);

export default Footer;