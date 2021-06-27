import React from 'react';
import Button from '../Button';
import classNames from 'classnames';
import styles from './index.module.scss';

const FormGroup = ({
  type = 'select',
  value = '',
  id,
  formRegister,
  label,
  onClose = () => {},
  //props for text input
  onTextInputChange = () => {},
  onTextInputBlur = () => {},
  placeholder,
  hasError = false,
  errorMessage = '',
  //props for select input
  onSelectChange = () => {},
  children,
}) => (
  <div
    className={styles.formGroup}
    data-testid="form_group"
  >
    {/* SELECT INPUT */}
    {type === 'select' && (
      <>
        <label className={styles.formGroup__label} htmlFor={id}>{label}</label>
        <select
          className={classNames(styles.formGroup__input, styles.formGroup__input_select)}
          id={id}
          {...formRegister}
          onChange={onSelectChange}
          value={value}>
          {children}
        </select>
      </>
    )}
    {/* TEXT INPUT */}
    {type === 'text' && (
      <>
        <input
          placeholder={placeholder}
          className={classNames(styles.formGroup__input, hasError && styles.formGroup__input_invalid)}
          id={id}
          value={value}
          {...formRegister}
          // for purely testing purposes, does not affect input change
          onChange={onTextInputChange}
          onBlur={onTextInputBlur}
        />
        <label className={styles.formGroup__placeholder} htmlFor={id}>{label}</label>
        {hasError && <span className={styles.formGroup__error}>{errorMessage}</span>}
      </>
    )}
    {/* BUTTON GROUP */}
    {type === 'submit' && (
      <>
        <div className={styles.formGroup__buttons}>
          <Button type="submit" name="Confirm" />
          <Button type="reset" name="Cancel" secondary onPressBtn={onClose} />
        </div>
      </>
    )}
  </div>
);

export default FormGroup;
