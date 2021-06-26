import { uniqBy } from '../utils/fn';

const transactionsReducer = (state, action) => {
  const { errorMessage } = action;

  switch (action.type) {
    case 'FETCH_TRANSACTIONS':
      return {
        ...state,
        isLoading: true,
        hasError: false,
        errorMessage: '',
      };
    case 'FETCH_TRANSACTIONS_SUCCESS':
      const { transactions, paginationFinish } = action;
      const isEmpty = !transactions.length;

      return {
        ...state,
        isLoading: false,
        hasError: false,
        transactions: isEmpty ? state.transactions : uniqBy(state.transactions.concat(transactions), ({ id }) => id),
        lastId: isEmpty ? state.lastId : transactions[transactions.length - 1].id,
        paginationFinish
      };
    case 'FETCH_TRANSACTIONS_FAILURE':
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errorMessage,
      };
    default:
      return state;
  }
};

export default  transactionsReducer;
