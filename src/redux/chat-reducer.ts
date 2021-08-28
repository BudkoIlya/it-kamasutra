import { FormAction } from 'redux-form';
import { securityAPI } from '../api/security-apiI';
import { ChatMessageType } from '../pages/Chat/ChatPage';
import { BaseThunkType, InferActionsTypes } from './redux-store';

const initialState = {
  messages: [] as ChatMessageType[],
};

const chatReducer = (
  state = initialState,
  action: ActionsType
): InitialAuthStateType => {
  switch (action.type) {
    case 'auth/SET_CAPTCHA_URL_SUCCESS': {
      return state;
    }
    default:
      return state;
  }
};

const actions = {
  getCaptchaUrlSuccess: (captchaUrl: string) =>
    ({
      type: 'auth/SET_CAPTCHA_URL_SUCCESS',
      payload: captchaUrl,
    } as const),
};

// thunks

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const { data } = await securityAPI.getCaptcha();
  dispatch(actions.getCaptchaUrlSuccess(data.url));
};

// types
export type InitialAuthStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;

export default chatReducer;
