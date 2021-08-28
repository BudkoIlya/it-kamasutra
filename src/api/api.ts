import axios from 'axios';
import { UserType } from '../types/types';

// конфигурация для axios запросов чтобы всегда её не писать
export const instance = axios.create({
  withCredentials: true,
  // baseURL автомат. будет прикреплятся к началу строки
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '42365f1f-0720-4a06-bd3a-f68d51e54a78',
  },
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}
export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10,
}

export type GetItemsType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};
// eslint-disable-next-line @typescript-eslint/ban-types
export type ResponseType<D = object, RC = ResultCodesEnum> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
};
