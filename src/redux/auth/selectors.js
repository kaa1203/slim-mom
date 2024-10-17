export const selectUser = state => state.auth.user.name;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectError = state => state.auth.error;
export const selectToken = state => state.auth.user.token;