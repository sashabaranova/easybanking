import React, { useState, useEffect } from 'react';
import { useHistory, generatePath } from "react-router-dom";
import { useForm } from "react-hook-form";
import Modal from 'react-modal';
import useAccountsApi from '../../hooks/useAccountsApi'
import useCreateTransactionApi from '../../hooks/useCreateTransactionApi'
import AccountListItem from '../AccountListItem';

import styles from './index.module.scss'
import classNames from 'classnames';
import Button from '../Button';
import OptionItem from '../OptionItem';

const moneyValueRegExp = /^\d+(,\d{3})*(\.\d*)?$/;
Modal.setAppElement('#root');

const Home = () => {
  // State
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [toAccount, setToAccount] = useState(null);
  const [fromAccount, setFromAccount] = useState(null);
  const [amountValue, setAmountValue] = useState('');
  const [description, setDescription] = useState('');

  // Hooks
  const [{ accounts, isLoading }, fetchAccounts] = useAccountsApi();
  const [{ errorMessage, hasError }, createTransaction] = useCreateTransactionApi();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    fetchAccounts()
  }, [])

  useEffect(() => {
      setAccountIds();
  }, [accounts, isLoading])

  let history = useHistory();

  const openModal = () => {
    setIsOpenModal(true);
  }

  const setAccountIds = () => {
    if (accounts.length) {
      setFromAccount(accounts[0].id);
      setToAccount(accounts[1] ? accounts[1].id : accounts[0].id);
    }
  }

  const resetForm = () => {
    setAccountIds();
    setAmountValue('');
    setDescription('');
    reset();
  }

  const closeModal = () => {
    setIsOpenModal(false);
    resetForm();
  }

  const onNavigateToAccount = (id) => {
    const path = generatePath('/accounts/:id', { id })
    history.push(path);
  }

  const onSetFromAccount = (e) => {
    setFromAccount(e.target.value)

    if (e.target.value === toAccount) {
      const toId = accounts.filter(({ id }) => id !== e.target.value)[0].id
      setToAccount(toId)
    }
  }

  const onSetToAccount = (e) => {
    setToAccount(e.target.value)

    if (e.target.value === fromAccount) {
      const fromId = accounts.filter(({ id }) => id !== e.target.value)[0].id
      setFromAccount(fromId)
    }
  }

  const onEnterAmount = (e) => {
    if (moneyValueRegExp.test(e.target.value) || !e.target.value) {
      setAmountValue(e.target.value);
    }
  }

  const onEnterDescription = (e) => {
    setDescription(e.target.value);
  }

  const onBlurAmount = () => {
    if (amountValue.length) {
      setAmountValue(parseInt(amountValue).toFixed(2))
    }
  }

  // useEffect(async () => {
  //   const result = await fetch('./api/formValues.json'); // result: { firstName: 'test', lastName: 'test2' }
  //   reset(result); // asynchronously reset your form values
  // }, [reset])

  const onSubmit = data => {
    const { from, to, amount, desc } = data;
    console.log('data', data);
    createTransaction(from, to, amount, desc);
  };

  // registration of fields for react-hook-form
  const amount = register('amount', { value: amountValue, required: 'Amount is required', pattern: moneyValueRegExp })
  const desc = register('desc', { value: description, required: 'Description is required' })
  const from = register('from')
  const to = register('to')

  return (
    <div className={styles.homeContent}>
      <h2>Transfer Funds</h2>
      <div className={styles.services}>
        <OptionItem name="Between Accounts" onOptionClick={openModal} />
        <OptionItem name="Overseas Tranfers" />
        <OptionItem name="Pay for Services" />
      </div>
      {isLoading ? <h2>Loading....</h2> : (
        <React.Fragment>
          <div className={styles.accounts}>
            <h2>Alexandra's accounts</h2>
            <ul className={styles.accountsContainer}>
              {accounts.map(({ name, balance, currency, id }) => (
                <AccountListItem onClick={() => onNavigateToAccount(id)} name={name} balance={balance} currency={currency} key={id} />
              ))}
            </ul>
          </div>
        </React.Fragment>
      )}
      {/* BREAK DOWN INTO A SEPARATE COMPONENT */}
      <Modal isOpen={isOpenModal} onRequestClose={closeModal} className={styles.Modal} overlayClassName={styles.Overlay}>
        {fromAccount && toAccount && (
          <React.Fragment>
            <h2>Transfer Between Accounts</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.form__group}>
                <label className={styles.form__label} htmlFor="from">From</label>
                <select
                  className={classNames(styles.form__input, styles.form__input_select)}
                  id="from"
                  {...from}
                  onChange={onSetFromAccount}
                  value={fromAccount}>
                  {accounts.map(account => (
                    <option value={account.id} key={account.id}>{account.name}</option>
                  ))}
                </select>
              </div>
              <div className={styles.form__group}>
                <label className={styles.form__label} htmlFor="to">To</label>
                <select
                  className={classNames(styles.form__input, styles.form__input_select)}
                  id="to"
                  {...to} value={toAccount} onChange={onSetToAccount}>
                  {accounts.map(account => (
                    <option value={account.id} key={account.id}>{account.name}</option>
                  ))}
                </select>
              </div>
              <div
                className={styles.form__group}
                onChange={onEnterDescription}
              >
                <input
                  placeholder="Description"
                  className={classNames(styles.form__input, (errors.desc) && styles.form__input_invalid)}
                  id="desc"
                  value={description}
                  {...desc}
                />
                <label className={styles.form__placeholder} htmlFor="desc">Description</label>
                {errors.desc && <span className={styles.form__error}>{errors.desc.message}</span>}
              </div>
              <div
                className={styles.form__group}
                onChange={onEnterAmount}
                onBlur={onBlurAmount}
              >
                <input
                  placeholder="Amount"
                  className={classNames(styles.form__input, (errors.amount) && styles.form__input_invalid)}
                  id="amount"
                  value={amountValue}
                  {...amount}
                />
                <label className={styles.form__placeholder} htmlFor="amount">Amount</label>
                {errors.amount && <span className={styles.form__error}>{errors.amount.message}</span>}
              </div>
              <div className={styles.form__group}>
                <div className={styles.btnContainer}>
                  <Button type="submit" name="Confirm" onPressBtn={() => { }} />
                  <Button type="reset" name="Cancel" secondary onPressBtn={closeModal} />
                </div>
              </div>
            </form>
          </React.Fragment>
        )}
      </Modal>
    </div>
  );
}

export default Home;