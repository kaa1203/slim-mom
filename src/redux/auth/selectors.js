export const selectUser = (state) => state.auth.user.user;
export const selectIsLoggedIn = state => !!state.auth?.user?.user;
export const selectError = state => state.auth.error;
export const selectToken = state => state.auth.user?.user?.token;
