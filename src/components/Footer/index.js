import React from 'react';
import styles from './index.module.scss';

const Footer = () => (
  <footer className={styles.footer} data-testid="footer">
    <p className={styles.footer__left} data-testid="footer_left">EasyBanking POC web app</p>
    <p className={styles.footer__right} data-testid="footer_right">&copy;Alex Baranova</p>
  </footer>
);

export default Footer;