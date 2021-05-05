export const codeLoadingSelector = (state) => state.code.loading;
export const codeErrorSelector = (state) => ({
  error: state.code.error,
  errorMessage: state.code.errorMessage,
});
export const codeMessageSelector = (state) => state.code.codeMessage;
