import React from 'react';
import styles from './index.module.scss';

const AccountItem = ({ onClick, name, balance = 0, currency }) => {

  return (
    <li className={styles.accountContainer} data-testid="account_item" onClick={onClick}>
      <div className={styles.accountContainer_wrapper}>
        <div className={styles.accountContainer__currency}>
          <span>{currency}</span>
        </div>
        <div className={styles.accountContainer__info}>
          <span className={styles.accountContainer__info__name}>{name}</span>
          <span className={styles.accountContainer__info__balance}>
            <span className={styles.accountContainer__info__label}>Balance: </span>
            {balance.toFixed(2)}
          </span>
        </div>
      </div>
    </li>
  );
};

export default AccountItem;