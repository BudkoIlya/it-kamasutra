import { Dispatch } from 'redux';
import { updateObjectInArray } from '../utils/objects-helpers';
import { UserType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { usersAPI } from '../api/users-api';
import { ResponseType } from '../api/api';

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0, // колличество пользователей
  currentPage: 1,
  isFetching: true, // загрузка идёт если тру
  followingInProgress: [] as Array<number>, // массив айдишек пользователь
  term: '',
  isFriends: 'all' as FilterGetUsersT['isFriends']
};

const usersReducer = (state = initialState, action: ActionsTypes): InitialUsersState => {
  // debugger;
  switch (action.type) {
    // TODO благодоря case ts показывает точное содержание экшена, тоесть для каждого кейса он свой
    case 'USERS/FOLLOW': {
      return {
        ...state,
        // здесь не нужно копировать потому что map возвращает новый массив
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
      };
    }
    case 'USERS/UNFOLLOW': {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
      };
    }
    case 'USERS/SET_USERS': {
      return { ...state, users: action.users };
    }
    case 'USERS/SET_CURRENT_PAGE': {
      return { ...state, currentPage: action.currentPage };
    }
    case 'USERS/SET_TOTAL_USERS_COUNT': {
      return { ...state, totalUsersCount: action.totalUsersCount };
    }
    case 'USERS/TOGGLE_IS_FETCHING': {
      return { ...state, isFetching: action.isFetching };
    }
    case 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
      return {
        ...state,
        followingInProgress: action.isFetching // если action.isFetching === true
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(
              id => id !== action.userId // возвращает все id которые не равны пользователю на которого подписываются
              // поэтому в метод some в Users вернёт false когда запрос будет выполнен
            )
      };
    }
    case 'USERS/SET_TERM': {
      return {
        ...state,
        term: action.term
      };
    }
    case 'USERS/SET_IS_FRIENDS': {
      return {
        ...state,
        isFriends: action.isFriends
      };
    }
    default:
      return state;
  }
};

export const actions = {
  // обязательно ставим as const, это определяет тип точнее, тоесть type: 'UNFOLLOW' будет не просто строка,
  // а - именно UNFOLLOW и это не даст ошибиться в case в редьюсере и не нужно создавать под тип отдельную переменную
  unFollowCreator: (userId: number) => ({ type: 'USERS/UNFOLLOW', userId } as const),
  followCreator: (userId: number) => ({ type: 'USERS/FOLLOW', userId } as const),
  setUsersCreator: (users: Array<UserType>) => ({ type: 'USERS/SET_USERS', users } as const),
  setCurrentPageCreator: (currentPage: number) => ({ type: 'USERS/SET_CURRENT_PAGE', currentPage } as const),
  setUsersTotalCountCreator: (totalUsersCount: number) =>
    ({
      type: 'USERS/SET_TOTAL_USERS_COUNT',
      totalUsersCount
    } as const),
  toggleIsFetchingCreator: (isFetching: boolean) =>
    ({
      type: 'USERS/TOGGLE_IS_FETCHING',
      isFetching
    } as const),
  toggleIsFollowingProgressCR: (isFetching: boolean, userId: number) =>
    ({
      type: 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
      isFetching,
      userId
    } as const),
  setTerm: (term: string = '') =>
    ({
      type: 'USERS/SET_TERM',
      term
    } as const),
  setIsFriends: (isFriends: FilterGetUsersT['isFriends'] = 'all') =>
    ({
      type: 'USERS/SET_IS_FRIENDS',
      isFriends
    } as const)
};

// TODO: Ниже идут создатели санок
// Первая функция - создатель санки, вторая функция - это санка, в которую передаётся dispatch и прочие аргуметы
export const getUsersThunkCreator =
  (currentPage: number, pageSize: number, filter: FilterGetUsersT): ThunkType =>
  async dispatch => {
    // идёт выбор нужной страницы пользователей для отображения
    dispatch(actions.setCurrentPageCreator(currentPage));
    // если идёт загрузка то работает прелоадер, здесь мы помечяем что идёт загрузка!
    dispatch(actions.toggleIsFetchingCreator(true));
    // Получаем всех узеров getUsers лежит в api
    const data = await usersAPI.getUsers(currentPage, pageSize, filter);
    // здесь мы помечяем что загрузка окончена!
    dispatch(actions.toggleIsFetchingCreator(false));
    dispatch(actions.setUsersCreator(data.items));
    // получааем количество страниц
    dispatch(actions.setUsersTotalCountCreator(data.totalCount));
    dispatch(actions.setTerm(filter.term));
    dispatch(actions.setIsFriends(filter.isFriends));
  };

// Dispatch<ActionsType> - еще один способ типизации диспатча
const followUnfollow = async (
  dispatch: Dispatch<ActionsTypes>,
  userId: number,
  apiMethod: (useId: number) => Promise<ResponseType>,
  actionCreator: (userId: number) => ReturnType<typeof actions.followCreator | typeof actions.unFollowCreator>
) => {
  dispatch(actions.toggleIsFollowingProgressCR(true, userId));

  const data = await apiMethod(userId);

  if (data.resultCode === 0) dispatch(actionCreator(userId));

  dispatch(actions.toggleIsFollowingProgressCR(false, userId));
};

export const followThunkCreator =
  (userId: number): ThunkType =>
  async dispatch => {
    // Запрос на подписку
    await followUnfollow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followCreator);
  };

export const unFollowThunkCreator =
  (userId: number): ThunkType =>
  async dispatch => {
    // Запрос на отписку
    await followUnfollow(dispatch, userId, usersAPI.unFollow.bind(usersAPI), actions.unFollowCreator);
  };

// types
export type InitialUsersState = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;
export type FilterGetUsersT = {
  term: string;
  isFriends: 'all' | 'true' | 'false';
};

export default usersReducer;
