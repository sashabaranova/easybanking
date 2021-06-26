const accountsInfoReducer = (state, action) => {
  const { errorMessage } = action;

  switch (action.type) {
    case 'FETCH_ACCOUNT_INFO':
      return {
        ...state,
        isLoading: true,
        hasError: false,
        accountInfo: {},
        errorMessage: '',
      };
    case 'FETCH_ACCOUNT_INFO_SUCCESS':
      const { accountInfo } = action;

      return {
        ...state,
        isLoading: false,
        hasError: false,
        accountInfo: { ...accountInfo }
      };
    case 'FETCH_ACCOUNT_INFO_FAILURE':
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

export default accountsInfoReducer;
