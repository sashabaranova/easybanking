import React, { useState, useEffect } from 'react';
import { useHistory, generatePath } from "react-router-dom";
import Modal from 'react-modal';
import useAccountsApi from '../../hooks/useAccountsApi';
import useCreateTransactionApi from '../../hooks/useCreateTransactionApi'
import AccountListItem from '../AccountListItem';

import styles from './index.module.scss';

import OptionItem from '../OptionItem';
import TransferForm from '../TransferForm';
import Button from '../Button';

// condition to avoid the statement throwing errors while testing
if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

const Home = () => {
  // State
  const [isOpenModal, setIsOpenModal] = useState(false);

  // Hooks
  const [{ accounts, isLoading }, fetchAccounts] = useAccountsApi();
  const [
    { errorMessage, hasError, successMessage },
    createTransaction,
    clearTransaction
  ] = useCreateTransactionApi();

  useEffect(() => {
    fetchAccounts()
  }, [successMessage]);

  let history = useHistory();

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    clearTransaction();
  };

  const onNavigateToAccount = (id) => {
    const path = generatePath('/accounts/:id', { id })
    history.push(path);
  };

  const onSubmit = (data) => {
    const { from, to, amount, desc } = data;
    createTransaction(from, to, amount, desc);
  };

  return (
    <div className={styles.homeContent} data-testid="home">
      {/* render Loader on loading accounts*/}
      {isLoading && !accounts.length ? <h2>Loading....</h2> : (
        <>
          <h2>Transfer Funds</h2>
          <div className={styles.services}>
            <OptionItem name="Between Accounts" onOptionClick={openModal} />
            {/* Options below are not available at the moment */}
            <OptionItem name="Overseas Tranfers" />
            <OptionItem name="Pay for Services" />
          </div>
          <div className={styles.accounts}>
            <h2>Alexandra's accounts</h2>
            {accounts.length ? (
              <ul className={styles.accountsContainer}>
                {accounts.map(({ name, balance, currency, id }) => (
                  <AccountListItem
                    onClick={() => onNavigateToAccount(id)}
                    name={name}
                    balance={balance}
                    currency={currency}
                    key={id}
                  />
                ))}
              </ul>
            ) : <p className={styles.accounts__none}>You don't have any accounts with EasyBanking.</p>}
          </div>
          <Modal
            isOpen={isOpenModal}
            onRequestClose={closeModal}
            className={styles.Modal}
            overlayClassName={styles.Overlay}
          >
            <>
              <h2>Transfer Between Accounts</h2>
              {accounts.length && !hasError && !successMessage && (
                <TransferForm accounts={accounts} onSubmit={onSubmit} onClose={closeModal} />
              )}
              {(hasError || successMessage) && (
                <>
                  <p className={hasError ? styles.error : styles.success}>
                    {errorMessage || successMessage}
                  </p>
                  <Button secondary name="Close" onPressBtn={closeModal} className={styles.closeBtn} />
                </>
              )}
            </>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Home;