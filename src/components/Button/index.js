import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

const Button = ({ name, secondary = false, type = 'button', onPressBtn = () => {}, className = '' }) => (
  <div>
    <button
      className={classNames(styles.btn, secondary && styles.btn_gray, className)}
      type={type}
      onClick={onPressBtn}
    >
      {name}
    </button>
  </div>
)

export default Button;