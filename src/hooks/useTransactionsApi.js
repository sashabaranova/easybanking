import { useReducer } from 'react';
import axios from 'axios';
import fetchTransactionsReducer from '../reducers/transactionsReducer';

const useTransactionsApi = () => {
  const [state, dispatch] = useReducer(fetchTransactionsReducer, {
    isLoading: false,
    hasError: false,
    transactions: [],
    errorMessage: '',
    lastId: null,
    limit: 10,
    paginationFinish: false,
  })

  const fetchTransactions = async (accountId, lastId = undefined, limit = 10) => {
    dispatch({ type: 'FETCH_TRANSACTIONS' });

    try {
      const response =
        await axios.get(`/api/v1/transactions/${accountId}?limit=${limit}&lastId=${lastId}`);
      if (response.status === 200) {
        const { data: { transactions, hasMore} } = response;

        dispatch({
          type: 'FETCH_TRANSACTIONS_SUCCESS',
          transactions,
          paginationFinish: hasMore
        });
      } else {
        const { message } = await response.json();

        dispatch({
          type: 'FETCH_TRANSACTIONS_FAILURE',
          errorMessage: message,
        });
      }
    } catch(error) {
      dispatch({
        type: 'FETCH_TRANSACTIONS_FAILURE',
        errorMessage: error.toString(),
      });
    }
  }

  return [state, fetchTransactions];
}

export default useTransactionsApi;
