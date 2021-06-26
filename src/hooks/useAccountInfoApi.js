import { useReducer } from 'react';
import axios from 'axios';
import accountsInfoReducer from '../reducers/accountsInfoReducer';

const useAccountInfoApi = () => {
  const [state, dispatch] = useReducer(accountsInfoReducer, {
    isLoading: false,
    hasError: false,
    accountInfo: {},
    errorMessage: '',
  })

  const fetchAccountInfo = async (id) => {
    dispatch({ type: 'FETCH_ACCOUNT_INFO' });

    try {
      const response = await axios.get(`/api/v1/accounts/${id}`);
      if (response.status === 200) {
        const { data } =response;
        dispatch({
          type: 'FETCH_ACCOUNT_INFO_SUCCESS',
          accountInfo: { ...data },
        });
      } else {
        const { message } = await response.json();

        dispatch({
          type: 'FETCH_ACCOUNT_INFO_FAILURE',
          errorMessage: message,
        });
      }
    } catch(error) {
      dispatch({
        type: 'FETCH_ACCOUNT_INFO_FAILURE',
        errorMessage: error.toString(),
      });
    }
  }

  return [state, fetchAccountInfo];
}

export default useAccountInfoApi;