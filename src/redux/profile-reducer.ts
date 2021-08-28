import { stopSubmit, FormAction } from 'redux-form';
import { PostsType, PhotosType, ProfileType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { profileAPI } from '../api/profile-api';

const initialState = {
  posts: [
    { id: 1, message: 'Hi', likeCounts: 21 },
    { id: 2, message: 'How a u', likeCounts: 22 },
    { id: 3, message: 'Yo', likeCounts: 23 },
  ] as Array<PostsType>,
  profile: null as ProfileType | null,
  status: '',
};

const profileReducer = (
  state = initialState,
  action: ActionsTypes
): InitialProfileStateType => {
  // Редакс работает только с копией экземпляра объекта, поэтому мы его копируем
  switch (action.type) {
    case 'profile/ADD_POST': {
      const newPost = {
        id: state.posts.length + 1,
        message: action.newPostBody,
        likeCounts: 0,
      };
      return {
        ...state,
        posts: [newPost, ...state.posts] as Array<PostsType>, // Убрать as ProfileType
      };
    }
    case 'profile/SET_USER_PROFILE': {
      return { ...state, profile: action.profile };
    }
    case 'profile/SET_STATUS': {
      return {
        ...state,
        status: action.status,
      };
    }
    case 'profile/DELETE_POST': {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.postId),
      };
    }
    case 'profile/SAVE_PHOTO_SUCCESS': {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType, // Убрать as ProfileType
      };
    }
    default:
      return state;
  }
};

export const actions = {
  addPostActionCreator: (newPostBody: PostsType) =>
    ({
      type: 'profile/ADD_POST',
      newPostBody,
    } as const),
  setUserProfile: (profile: ProfileType) =>
    ({ type: 'profile/SET_USER_PROFILE', profile } as const),
  setStatus: (status: string) =>
    ({ type: 'profile/SET_STATUS', status } as const),
  deletePost: (postId: number) =>
    ({ type: 'profile/DELETE_POST', postId } as const),
  savePhotoSuccess: (photos: PhotosType) =>
    ({ type: 'profile/SAVE_PHOTO_SUCCESS', photos } as const),
};

// thunks
export const getUsersProfileThunk =
  (userId: number): ThunkType =>
  async (dispatch) => {
    console.log('getUsersProfileThunk');
    const response = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(response));
  };
export const setStatusThunk =
  (userId: number): ThunkType =>
  async (dispatch) => {
    try {
      const response = await profileAPI.getStatus(userId);
      dispatch(actions.setStatus(response));
    } catch (e) {
      console.error(e);
    }
  };
export const updateStatusThunk =
  (status: string): ThunkType =>
  async (dispatch) => {
    try {
      const response = await profileAPI.updateStatus(status);
      response.resultCode === 0 && dispatch(actions.setStatus(status));
    } catch (e) {
      console.error(e);
    }
  };
export const savePhotoThunk =
  (photo: File): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.savePhoto(photo);
    response.resultCode === 0 &&
      dispatch(actions.savePhotoSuccess(response.data.photos));
  };

export const saveProfileThunk =
  (newProfileData: ProfileType): ThunkType =>
  async (dispatch, getState) => {
    const { resultCode, messages } = await profileAPI.saveProfile(
      newProfileData
    );
    if (resultCode === 0) {
      const { userId } = getState().auth;
      userId && (await dispatch(getUsersProfileThunk(userId)));
      return true;
    }
    if (messages[0].includes('Invalid url')) {
      // достаю из сообщения ошибки нужную часть строки для контактов
      const fieldForError = messages[0]
        .slice(messages[0].indexOf('>') + 1, messages[0].length - 1)
        .toLowerCase();
      dispatch(
        stopSubmit('profileEdit', {
          contacts: { [fieldForError]: 'Не правильный адрес контакта' },
        })
      );
    } else {
      // достаю ошибку для обязательных полей
      let fieldForError = messages[0].slice(
        messages[0].indexOf('(') + 1,
        messages[0].length - 1
      );
      fieldForError = fieldForError[0].toLowerCase() + fieldForError.slice(1);
      dispatch(
        stopSubmit('profileEdit', { [fieldForError]: 'Обязательное поле' })
      );
      // реджект промиса чтобы не запускать setEditMode(false) на странице редактирования профиля
    }
    return Promise.reject(messages[0]);
  };

// types
export type InitialProfileStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

export default profileReducer;
