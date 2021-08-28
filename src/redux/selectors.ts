import { AppStateType } from './redux-store';

// userPage
export const getUsers = ({ usersPage }: AppStateType) => usersPage.users;
export const getPageSize = ({ usersPage }: AppStateType) => usersPage.pageSize;
export const getTotalUsersCount = ({ usersPage }: AppStateType) =>
  usersPage.totalUsersCount;
export const getCurrentPage = ({ usersPage }: AppStateType) =>
  usersPage.currentPage;
export const getIsFetching = ({ usersPage }: AppStateType) =>
  usersPage.isFetching;
export const getFollowingInProgress = ({ usersPage }: AppStateType) =>
  usersPage.followingInProgress;
export const getTerm = ({ usersPage }: AppStateType) => usersPage.term;
export const getIsFriends = ({ usersPage }: AppStateType) =>
  usersPage.isFriends;

// auth
export const selectCaptchaUrl = ({ auth }: AppStateType) => auth.captchaUrl;
export const selectIsAuth = ({ auth }: AppStateType) => auth.isAuth;
export const selectLogin = ({ auth }: AppStateType) => auth.login;
