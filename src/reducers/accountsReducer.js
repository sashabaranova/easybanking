import { uniqBy } from '../utils/fn';

const accountsReducer = (state, action) => {
  const { errorMessage } = action;
  switch (action.type) {
    case 'FETCH_ACCOUNTS':
      return {
        ...state,
        isLoading: true,
        hasError: false,
        errorMessage: '',
      };
    case 'FETCH_ACCOUNTS_SUCCESS':
      const { accounts } = action;
      const isEmpty = !accounts.length;
      return {
        ...state,
        isLoading: false,
        hasError: false,
        accounts: isEmpty ? state.accounts : uniqBy(accounts.concat(state.accounts), ({ id }) => id),
      };
    case 'FETCH_ACCOUNTS_FAILURE':
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

export default accountsReducer;
