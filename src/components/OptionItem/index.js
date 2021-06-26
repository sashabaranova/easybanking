import React from 'react';
import styles from './index.module.scss';

const OptionItem = ({ name, onOptionClick = () => {} }) => (
  <div className={styles.optionContainer} role="button" onClick={onOptionClick}>
    <div className={styles.optionContainer__iternal}>
      <span className={styles.optionContainer__name}>{name}</span>
    </div>
  </div>
)

export default OptionItem;