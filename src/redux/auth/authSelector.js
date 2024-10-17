export const getModalStatus = store => store.auth.showModal;
export const getLoginStatus = store => store.auth.isLogin;
export const getUserDailyDiet = store => store.auth.userDailyDiet;
export const getDailyIntake = store => store.auth.dailyDiet;
export const getLoadingStatus = store => store.auth.isLoading;