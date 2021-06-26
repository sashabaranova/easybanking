import React from 'react';
import format from 'date-fns/format';
import styles from './index.module.scss';

const DateItem = ({ date }) => (
  <li className={styles.dateContainer}>
    <span>{format(new Date(date), 'EEEE, dd MMM, yyyy')}</span>
  </li>
);

export default DateItem;
