import {
  instance,
  ResponseType,
  ResultCodeForCaptcha,
  ResultCodesEnum,
} from './api';

type MeResponseDataType = {
  id: number;
  email: string;
  login: string;
};
type LoginResponseDataType = {
  userId: number;
};

export const authAPI = {
  me() {
    // get<MeResponseType> - делая запрос мы ожидаем получить объект типа MeResponseType
    return instance
      .get<ResponseType<MeResponseDataType>>('auth/me')
      .then((res) => res.data);
  },
  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) {
    return instance.post<
      ResponseType<
        LoginResponseDataType,
        ResultCodeForCaptcha | ResultCodesEnum
      >
    >('auth/login', {
      email,
      password,
      rememberMe,
      captcha,
    });
  },
  // TODO: При зазлогине возвращаеться пустая дата
  logout() {
    return instance.delete<ResponseType>('auth/login');
  },
};
