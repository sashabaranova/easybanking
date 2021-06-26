const accountsReducer = (state, action) => {
  const { errorMessage } = action;

  switch (action.type) {
    case 'FETCH_ACCOUNTS':
      return {
        ...state,
        isLoading: true,
        hasError: false,
        accounts: [],
        errorMessage: '',
      };
    case 'FETCH_ACCOUNTS_SUCCESS':
      const { accounts } = action;

      return {
        ...state,
        isLoading: false,
        hasError: false,
        accounts
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
