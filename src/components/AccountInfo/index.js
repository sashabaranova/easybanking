import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAccountInfoApi from '../../hooks/useAccountInfoApi';
import useTransactionsApi from '../../hooks/useTransactionsApi';
import Button from '../Button';
import Transactions from '../Transactions';
import styles from './index.module.scss'
const AccountInfo = () => {
  const { id } = useParams()

  const [{ accountInfo, isLoading }, fetchAccountInfo] = useAccountInfoApi();
  const [{ transactions, isLoading: isLoadingTransactions, lastId, paginationFinish }, fetchTransactions] = useTransactionsApi();

  useEffect(() => {
    if (id) {
      fetchAccountInfo(id)
      fetchTransactions(id)
    }
  }, [id])

  const onLoadMore = () => {
    fetchTransactions(id, lastId)
  }

  const { name } = accountInfo;

  return isLoading && isLoadingTransactions ? <h2>Loading....</h2> : (
    <div className={styles.infoContainer}>
      <h2>Account: {name}</h2>
      {transactions.length ? <Transactions transactions={transactions} /> :
        <p>You don't have any transactions with this account.</p>
      }
      {!!transactions.length && !paginationFinish &&
        <Button onPressBtn={onLoadMore} name="Load More" className={styles.customBtn} />
      }
    </div>
  )
};

export default AccountInfo;