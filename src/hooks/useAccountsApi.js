import { useReducer } from 'react';
import axios from 'axios';
import accountsReducer from '../reducers/accountsReducer';

const useAccountsApi = () => {
  const [state, dispatch] = useReducer(accountsReducer, {
    isLoading: false,
    hasError: false,
    accounts: [],
    errorMessage: '',
  })

  const fetchAccounts = async () => {
    dispatch({ type: 'FETCH_ACCOUNTS' });

    try {
      const response = await axios.get('/api/v1/accounts');
      if (response.status === 200) {
        const { data } = response;

        dispatch({
          type: 'FETCH_ACCOUNTS_SUCCESS',
          accounts: data,
        });
      } else {
        const { message } = await response.json();

        dispatch({
          type: 'FETCH_ACCOUNTS_FAILURE',
          errorMessage: message,
        });
      }
    } catch(error) {
      dispatch({
        type: 'FETCH_ACCOUNTS_FAILURE',
        errorMessage: error.toString(),
      });
    }
  }

  return [state, fetchAccounts];
}

export default useAccountsApi;




