import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import FormGroup from '../FormGroup';
import styles from './index.module.scss';

const moneyValueRegExp = /^\d+(,\d{3})*(\.\d*)?$/;


const TransferForm = ({ accounts, onClose, onSubmit }) => {

  const [toAccount, setToAccount] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [amountValue, setAmountValue] = useState('');
  const [description, setDescription] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    setAccountIds();
  }, []);

  const setAccountIds = () => {
    if (accounts.length) {
      setFromAccount(accounts[0].id);
      setToAccount(accounts[1] ? accounts[1].id : accounts[0].id);
    }
  };

  const onSetFromAccount = (e) => {
    setFromAccount(e.target.value)

    if (e.target.value === toAccount) {
      const toId = accounts.filter(({ id }) => id !== e.target.value)[0].id
      setToAccount(toId)
    }
  };

  const onSetToAccount = (e) => {
    setToAccount(e.target.value)

    if (e.target.value === fromAccount) {
      const fromId = accounts.filter(({ id }) => id !== e.target.value)[0].id
      setFromAccount(fromId)
    }
  };

  const onEnterAmount = (e) => {
    e.preventDefault();
    if (moneyValueRegExp.test(e.target.value) || !e.target.value) {
      setAmountValue(e.target.value);
    }
  };

  const onEnterDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const onBlurAmount = (e) => {
    e.preventDefault();
    if (amountValue.length) {
      setAmountValue(parseInt(amountValue).toFixed(2))
    }
  };

  // registration of fields for react-hook-form
  const amount = register(
    'amount',
    {
      value: amountValue, required: 'Amount is required',
      pattern: moneyValueRegExp
    });
  const desc = register('desc', { value: description, required: 'Description is required' });
  const from = register('from', { value: fromAccount });
  const to = register('to', { value: toAccount});

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} data-testid="form">
      <FormGroup
        type="select"
        label="From"
        id="from"
        onSelectChange={onSetFromAccount}
        value={fromAccount}
        formRegister={from}
      >
        {accounts.map(account => (
          <option value={account.id} key={account.id}>{account.name}</option>
        ))}
      </FormGroup>
      <FormGroup
        type="select"
        label="To"
        id="to"
        onSelectChange={onSetToAccount}
        value={toAccount}
        formRegister={to}
      >
        {accounts.map(account => (
          <option value={account.id} key={account.id}>{account.name}</option>
        ))}
      </FormGroup>
      <FormGroup
        type="text"
        label="Description"
        placeholder="Description"
        value={description}
        id="desc"
        formRegister={desc}
        onTextInputChange={onEnterDescription}
        hasError={errors.desc}
        errorMessage={errors.desc ? errors.desc.message : ''}
      />
      <FormGroup
        type="text"
        label="Amount"
        placeholder="Amount"
        value={amountValue}
        id="amount"
        formRegister={amount}
        onTextInputChange={onEnterAmount}
        onTextInputBlur={onBlurAmount}
        hasError={errors.desc}
        errorMessage={errors.amount ? errors.amount.message : ''}
      />
      <FormGroup
        type='submit'
        onClose={onClose}
      />
    </form>
  );
};

export default TransferForm;