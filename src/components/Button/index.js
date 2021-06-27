import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

const Button = ({
  name,
  secondary = false,
  type = 'button',
  onPressBtn = () => { },
  className = '',
  btnClassName = '',
}) => (
  <div className={className || ''}>
    <button
      className={classNames(styles.btn, secondary && styles.btn_gray, btnClassName)}
      type={type}
      onClick={onPressBtn}
    >
      {name}
    </button>
  </div>
);

export default Button;