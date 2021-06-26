import { useReducer } from 'react';
import axios from 'axios';
import newTransactionReducer from '../reducers/newTransactionReducer';

const useCreateTransactionApi = () => {
  const [state, dispatch] = useReducer(newTransactionReducer, {
    isLoading: false,
    hasError: false,
    errorMessage: '',
  })

  const createTransaction = async (accountFrom, accountTo, amount, description, currency = 'USD') => {
    dispatch({ type: 'CREATE_TRANSACTION' });

    try {
      const data = {
        accountFrom,
        accountTo,
        amount: parseInt(amount),
        description,
        currency
      };

      const response =
        await axios.post(`/api/v1/transactions`, data);
      // added additionally to handle Mirage js issue
      if (response.data.httpStatus === 400) {
        const { message } =  response.data;
        dispatch({
          type: 'CREATE_TRANSACTION_FAILURE',
          errorMessage: message,
        });
      }
      if (response.status === 201) {
        dispatch({
          type: 'CREATE_TRANSACTION_SUCCESS',
        });
      } else {
        const { message } =  response;
        dispatch({
          type: 'CREATE_TRANSACTION_FAILURE',
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

  return [state, createTransaction];
}

export default useCreateTransactionApi;
