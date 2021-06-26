import React from 'react';
import format from 'date-fns/format'
import classNames from 'classnames';
import styles from './index.module.scss'

const TransactionListItem = ({ desc, timestamp, amount, currency }) => {
  const date = new Date(timestamp)
  return (
    <li className={styles.transactionContainer}>
      <div className={styles.transaction}>
        <div className={styles.transactionInfo}>
          <span className={styles.transactionInfo__desc}>{desc}</span>
          {timestamp && <span className={styles.transactionInfo__time}>{format(date, 'dd MMM, yyyy')} at {format(date, 'hh:mm aa')}</span>}
        </div>
        <div className={styles.transactionDetails}>
          <span className={classNames(styles.transactionDetails__amount, {[styles.transactionDetails__amount_plus]: amount > 0 })}>{amount > 0 ? `+${amount.toFixed(2)}` : amount.toFixed(2)}</span>
          <span className={classNames(styles.transactionDetails__currency, {[styles.transactionDetails__currency_plus]: amount > 0 })}>{currency}</span>
        </div>
      </div>
    </li>
  )
}

export default TransactionListItem;