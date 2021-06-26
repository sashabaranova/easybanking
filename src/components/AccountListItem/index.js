import React from 'react';
import styles from './index.module.scss'

const AccountItem = ({ onClick, name, balance, currency }) => {

  return (
    <li className={styles.accountContainer} onClick={onClick}>
      <div className={styles.accountContainer_wrapper}>
        <div className={styles.accountContainer__currency}>
          <span>{currency}</span>
        </div>
        <div className={styles.accountContainer__info}>
          <span className={styles.accountContainer__info__name}>{name}</span>
          <span className={styles.accountContainer__info__balance}>{balance.toFixed(2)}</span>
        </div>
      </div>
    </li>
  );
};

export default AccountItem;