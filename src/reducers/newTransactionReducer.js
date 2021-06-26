const newTransactionReducer = (state, action) => {
  const { errorMessage } = action;

  switch (action.type) {
    case 'CREATE_TRANSACTION':
      return {
        ...state,
        isLoading: true,
        hasError: false,
        errorMessage: '',
      };
    case 'CREATE_TRANSACTION_SUCCESS':
      return {
        ...state,
        isLoading: false,
      };
    case 'CREATE_TRANSACTION_FAILURE':
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

export default  newTransactionReducer;
