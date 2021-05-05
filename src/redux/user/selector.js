export const userSelector = (state) => state.user.user;
export const tokenSelector = (state) => state.user.token;
export const errorSelector = (state) => ({
  error: state.user.error,
  errorMessage: state.user.errorMessage,
});
export const loadingSelector = (state) => state.user.loading;
export const initialNameSelector = (state) => state.user.initialName;
