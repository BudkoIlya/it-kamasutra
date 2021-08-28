import { ThunkAction } from 'redux-thunk';
import { getAuthUserDataThunk } from './auth-reducer';
import { AppStateType, InferActionsTypes } from './redux-store';

const initialState = {
  initialized: false,
};

const appReducer = (
  state = initialState,
  action: ActionsTypes
): InitialAppStateType => {
  // debugger;
  switch (action.type) {
    case 'app/INITIALIZED_SUCCESS': {
      return {
        ...state,
        initialized: true,
      };
    }
    default:
      return state;
  }
};

const actions = {
  initializedSuccess: () => ({ type: 'app/INITIALIZED_SUCCESS' } as const),
};

// thunks
export const initializeApp = (): InitializeAppType => async (dispatch) => {
  await dispatch(getAuthUserDataThunk());
  dispatch(actions.initializedSuccess());
};

// types
export type InitialAppStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type InitializeAppType = ThunkAction<
  Promise<void>,
  AppStateType,
  any,
  ActionsTypes
>;

export default appReducer;
