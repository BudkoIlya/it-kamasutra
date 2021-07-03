import { applyMiddleware, combineReducers, createStore, compose, Action } from 'redux';
import thunkMiddleWare, { ThunkAction } from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import appReducer from './App-reducer';

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer
});

type RootReducerType = typeof reducers; // (globalstate: AppStateType) => AppStateType - это тип функции
export type AppStateType = ReturnType<RootReducerType>; // возвращает из функциии тип всего стэйта

// TODO: универсальное определение типов экшинов
export type InferActionsTypes<T> = T extends { [key: string]: (...args: Array<any>) => infer U } ? U : never;

// TODO: универсальная типизация санок
// ThunkAction - очень крутая типизация ts если используется getState и санка что-то возращает + extraArgument(пока не знаю что это)
export type BaseThunkType<A extends Action, R = Promise<void | true>> = ThunkAction<R, AppStateType, unknown, A>;

// TODO: подключение раcширения редакс для браузера
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
window.__store__ = store;

export default store;
