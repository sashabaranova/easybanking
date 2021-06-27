const newTransactionReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_TRANSACTION':
      return {
        ...state,
        isLoading: true,
        hasError: false,
        errorMessage: '',
        successMessage: '',
      };
    case 'CREATE_TRANSACTION_SUCCESS':
      const { successMessage } = action;

      return {
        ...state,
        isLoading: false,
        successMessage
      };
    case 'CREATE_TRANSACTION_FAILURE':
      const { errorMessage } = action;

      return {
        ...state,
        isLoading: false,
        hasError: true,
        errorMessage,
      };
    case 'CLEAR_TRANSACTION':
      return {
        ...state,
        hasError: false,
        errorMessage: '',
        successMessage: '',
      };
    default:
      return state;
  }
};

export default newTransactionReducer;
