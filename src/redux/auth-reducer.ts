import { FormAction, stopSubmit } from 'redux-form';
import { ResultCodesEnum, ResultCodeForCaptcha } from '../api/api';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { authAPI } from '../api/auth-api';
import { securityAPI } from '../api/security-apiI';

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};

const authReducer = (
  state = initialState,
  action: ActionsType
): InitialAuthStateType => {
  switch (action.type) {
    case 'auth/SET_USER_DATA': {
      return {
        ...state,
        // в action.data лежат userId, email, login, поэтому он их перезапишет
        ...action.payload,
      };
    }
    case 'auth/SET_CAPTCHA_URL_SUCCESS': {
      return {
        ...state,
        captchaUrl: action.payload,
      };
    }
    default:
      return state;
  }
};

const actions = {
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: 'auth/SET_USER_DATA',
      payload: { userId, email, login, isAuth },
    } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) =>
    ({
      type: 'auth/SET_CAPTCHA_URL_SUCCESS',
      payload: captchaUrl,
    } as const),
};

// thunks
export const getAuthUserDataThunk = (): ThunkType => async (dispatch) => {
  const {
    resultCode,
    data: { id, email, login },
  } = await authAPI.me();
  if (resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
  // асинхронная функции возвращает промис
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const { data } = await securityAPI.getCaptcha();
  dispatch(actions.getCaptchaUrlSuccess(data.url));
};
export const login =
  (
    email: string,
    pass: string,
    rememberMe: boolean,
    captcha: string
  ): ThunkType =>
  async (dispatch) => {
    const { data } = await authAPI.login(email, pass, rememberMe, captcha);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserDataThunk());
      return true;
    }
    if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
      dispatch(getCaptchaUrl());
    }
    // _error создаёт параметр error который прокидывается в форму login
    const message = data.messages.length > 0 ? data.messages[0] : 'Some error';
    dispatch(stopSubmit('login', { _error: message }));
    return Promise.reject(message);
  };
export const logout = (): ThunkType => async (dispatch) => {
  const { data } = await authAPI.logout();
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

// types
export type InitialAuthStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;

export default authReducer;
